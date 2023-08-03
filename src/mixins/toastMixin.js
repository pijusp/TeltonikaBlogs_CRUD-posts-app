// toastMixin.js
export default {
    methods: {
        showToast(message, type, options) {
            const defaultOptions = {
                position: "top-right",
                timeout: 3000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: "button",
                icon: true,
                rtl: false,
            };

            const toastOptions = {
                ...defaultOptions,
                ...options,
            };

            switch (type) {
                case "warning":
                    this.$toast.warning(message, toastOptions);
                    break;
                case "success":
                    this.$toast.success(message, toastOptions);
                    break;
                default:
                    this.$toast(message, toastOptions);
                    break;
            }
        },
    },
};
