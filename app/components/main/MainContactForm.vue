<script setup lang="ts">
import type { MailApiResponse } from "~~/types/types";

// Data -------------------
const contactForm = reactive({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", // honeypot field
});
const validateName = ref(false);
const validateEmail = ref(false);
const validatePhone = ref(false);
const loading = ref(false);
const resultMessage = ref("");

// Computed --------------------
const nameError = computed(() => {
    if (
        contactForm.name === "" ||
        contactForm.name.length < 2 ||
        contactForm.name.length > 100
    ) {
        return "Name is required. Max 100 chars";
    }
    return "";
});
const phoneError = computed(() => {
    if (
        contactForm.phone !== "" &&
        (contactForm.phone.length < 7 || contactForm.phone.length > 20)
    ) {
        return "A valid phone number should be between 7 and 20 characters";
    }
    return "";
});
const emailError = computed(() => {
    if (
        !String(contactForm.email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            )
    ) {
        return "Must be a valid email address";
    }
    return "";
});
const isError = computed(() => {
    return (
        nameError.value !== "" ||
        emailError.value !== "" ||
        phoneError.value !== ""
    );
});

// Funcs --------------------
const isOkResponse = (response: unknown): response is MailApiResponse => {
    return (
        typeof response === "object" &&
        response !== null &&
        "success" in response &&
        response.success === true
    );
};
const clearForm = () => {
    Object.assign(contactForm, {
        name: "",
        email: "",
        phone: "",
        message: "",
        website: "",
    });
    validateName.value = false;
    validateEmail.value = false;
    validatePhone.value = false;
    resultMessage.value = "";
};
const submitToServer = () => {
    return $fetch(`/api/mail`, {
        method: "POST",
        body: JSON.stringify(contactForm),
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
    });
};
const handleSubmit = async () => {
    loading.value = true;
    try {
        const response = await submitToServer();
        if (isOkResponse(response)) {
            clearForm();
            resultMessage.value = "✅ Thank you for your message.";
        } else {
            // Show error message from server if there is one
            const errorMsg =
                typeof response === "object" &&
                response !== null &&
                "error" in response &&
                typeof response.error === "string"
                    ? response.error
                    : "There was an error sending your message.";
            resultMessage.value = `❌ ${errorMsg}`;
        }
    } catch (e) {
        console.error(e);
        if (
            e instanceof Error &&
            (e.message.includes("timeout") || e.message.includes("network"))
        ) {
            resultMessage.value =
                "❌ Network issue. Please check your connection and try again.";
        } else {
            resultMessage.value =
                "❌ Sorry, there was an error. Please try later.";
        }
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div>
        <form class="flex flex-col" @submit="handleSubmit">
            <label for="name" class="pt-3">Your name</label>
            <input
                id="name"
                v-model="contactForm.name"
                name="name"
                type="text"
                placeholder="name"
                :aria-invalid="nameError && validateName ? 'true' : 'false'"
                :aria-describedby="
                    nameError && validateName ? 'name-error' : undefined
                "
                :class="[
                    'px-2 py-2 rounded-lg bg-inherit border-2 focus:ring-1 focus:ring-green-600 dark:focus:ring-green-600 focus:border-green-600 dark:focus:border-green-600',
                    { error: nameError && validateName },
                ]"
                @blur="validateName = true"
            />
            <p
                id="name-error"
                role="alert"
                aria-live="polite"
                class="text-red-500 text-sm my-0!"
            >
                <transition name="fade" mode="out-in">
                    <span v-if="nameError && validateName">{{
                        nameError
                    }}</span>
                    <br v-else />
                </transition>
            </p>
            <label for="email" class="pt-3">Your email address</label>
            <input
                id="email"
                v-model="contactForm.email"
                name="email"
                type="email"
                placeholder="email"
                :aria-invalid="emailError && validateEmail ? 'true' : 'false'"
                :aria-describedby="
                    emailError && validateEmail ? 'email-error' : undefined
                "
                :class="[
                    'px-2 py-2 rounded-lg bg-inherit border-2 focus:ring-1 focus:ring-green-600 dark:focus:ring-green-600 focus:border-green-600 dark:focus:border-green-600',
                    { error: emailError && validateEmail },
                ]"
                @blur="validateEmail = true"
            />
            <p
                id="email-error"
                role="alert"
                aria-live="polite"
                class="text-red-500 text-sm my-0!"
            >
                <transition name="fade" mode="out-in">
                    <span v-if="emailError && validateEmail">{{
                        emailError
                    }}</span>
                    <br v-else />
                </transition>
            </p>
            <label for="phone" class="pt-3">Your phone number</label>
            <input
                id="phone"
                v-model="contactForm.phone"
                name="phone"
                type="tel"
                placeholder="phone"
                :aria-invalid="phoneError && validatePhone ? 'true' : 'false'"
                :aria-describedby="
                    phoneError && validatePhone ? 'phone-error' : undefined
                "
                :class="[
                    'px-2 py-2 rounded-lg bg-inherit border-2 focus:ring-1 focus:ring-green-600 dark:focus:ring-green-600 focus:border-green-600 dark:focus:border-green-600',
                    { error: phoneError && validatePhone },
                ]"
                @blur="validatePhone = true"
            />
            <p
                id="phone-error"
                role="alert"
                aria-live="polite"
                class="text-red-500 text-sm my-0!"
            >
                <transition name="fade" mode="out-in">
                    <span v-if="phoneError && validatePhone">{{
                        phoneError
                    }}</span>
                    <br v-else />
                </transition>
            </p>
            <br />
            <label for="website" class="hidden" tabindex="-1">website</label>
            <input
                v-model="contactForm.website"
                name="website"
                type="text"
                class="hidden"
                tabindex="-1"
                autocomplete="off"
            />

            <label for="message" class="pt-3">Your message</label>
            <textarea
                id="message"
                v-model="contactForm.message"
                name="message"
                cols="30"
                rows="10"
                placeholder="your message"
                class="px-2 py-2 rounded-lg bg-inherit border-2 focus:ring-1 focus:ring-green-600 dark:focus:ring-green-600 focus:border-green-600 dark:focus:border-green-600"
            />
            <br />
            <div class="w-full text-center">
                <button
                    :disabled="isError || loading"
                    class="text-white bg-green-700 w-[50%] py-2 px-4 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:shadow-xl hover:opacity-75 ease-in-out duration-300 flex flex-row items-center justify-center mx-auto mt-5 disabled:opacity-40 disabled:cursor-not-allowed disabled:focus:ring-0"
                    @click.stop.prevent="handleSubmit"
                >
                    <svg
                        v-if="loading"
                        role="status"
                        class="w-7 h-7 text-green-600 animate-spin fill-white"
                        viewBox="0 0 100 101"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span v-else>Submit</span>
                </button>
            </div>
        </form>
        <transition name="fade">
            <div
                v-if="resultMessage !== ''"
                class="flex flex-col items-center px-5 py-1 mt-5"
            >
                <p>{{ resultMessage }}</p>
                <nuxt-link
                    to="/"
                    tag="a"
                    class="text-green-700 underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                    >Home</nuxt-link
                >
            </div>
        </transition>
    </div>
</template>

<style scoped>
/* Fade transition animation */
.fade-enter-active,
.fade-leave-active {
    transition:
        opacity 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) 0.1s,
        transform 1.2s cubic-bezier(0.215, 0.61, 0.355, 1) 0.1s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
/* Error shake animation */
.error {
    border-color: red;
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
}
@keyframes shake {
    10%,
    90% {
        transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
        transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
        transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
        transform: translate3d(4px, 0, 0);
    }
}
/* Change autocomplete styles in WebKit in dark mode */
.dark-mode input:-webkit-autofill,
.dark-mode input:-webkit-autofill:hover,
.dark-mode input:-webkit-autofill:focus,
.dark-mode textarea:-webkit-autofill,
.dark-mode textarea:-webkit-autofill:hover,
.dark-mode textarea:-webkit-autofill:focus,
.dark-mode select:-webkit-autofill,
.dark-mode select:-webkit-autofill:hover,
.dark-mode select:-webkit-autofill:focus {
    -webkit-text-fill-color: white;
    transition: background-color 5000s ease-in-out 0s;
}
</style>
