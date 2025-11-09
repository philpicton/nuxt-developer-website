// This composable handles all the frontend logic for the
// Contact form in MainContactForm.vue.
// It performs the validation, handles the errors and loading state,
// and sends the submitted data to the server, to then be sent to the
// resend api.

import type {
    ContactForm,
    MailApiResponse,
    ContactFormValidation,
} from "~~/types/types";
import { computed } from "vue";

export function useContactForm() {
    // STATE ---------------------------------
    const loading = ref(false);
    const resultMessage = ref("");

    // Factory functions
    function createEmptyContactForm(): ContactForm {
        return {
            name: "",
            email: "",
            phone: "",
            message: "",
            website: "",
        };
    }
    function createValidation(): ContactFormValidation {
        return {
            name: false,
            email: false,
            phone: false,
        };
    }
    const contactForm = ref<ContactForm>(createEmptyContactForm());
    const validate = ref<ContactFormValidation>(createValidation());

    // COMPUTED PROPERTIES ----------------------

    // Validates the name field on the form, if incorrect returns an error message
    const name = computed<string>(() => {
        if (
            contactForm.value.name === "" ||
            contactForm.value.name.length < 2 ||
            contactForm.value.name.length > 100
        ) {
            return "Name is required. Max 100 chars";
        }
        return "";
    });

    // Validates the phone field on the form, if incorrect returns an error message
    const phone = computed<string>(() => {
        if (
            contactForm.value.phone !== "" &&
            (contactForm.value.phone.length < 7 ||
                contactForm.value.phone.length > 20)
        ) {
            return "A valid phone number should be between 7 and 20 characters";
        }
        return "";
    });

    // Validates the email field on the form, if incorrect returns an error message
    const email = computed<string>(() => {
        if (
            !String(contactForm.value.email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                )
        ) {
            return "Must be a valid email address";
        }
        return "";
    });

    // Checks all of the validation for any errors
    const isError = computed<boolean>(() => {
        return name.value !== "" || email.value !== "" || phone.value !== "";
    });

    const errors = computed(() => {
        return {
            name: name.value,
            phone: phone.value,
            email: email.value,
            isError: isError.value,
        };
    });

    // FUNCTIONS -------------------------------------

    // Validate the API response
    const isOkResponse = (response: unknown): response is MailApiResponse => {
        return (
            typeof response === "object" &&
            response !== null &&
            "success" in response &&
            response.success === true
        );
    };

    // Resets the refs and therefore form inputs
    const clearForm = () => {
        contactForm.value = createEmptyContactForm();
        validate.value = createValidation();
        resultMessage.value = "";
    };

    // Send the validated form data to the API endpoint
    const submitToServer = () => {
        return $fetch(`/api/mail`, {
            method: "POST",
            body: JSON.stringify(contactForm.value),
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 10000, // 10 second timeout
        });
    };

    // Handle the submit event on the form
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
            // Handle any other errors
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

    // EXPORT THE REFS AND THE HANDLESUBMIT FUNCTION ----------------

    return {
        errors,
        loading,
        resultMessage,
        handleSubmit,
        contactForm,
        validate,
    };
}
