/*!
 * Toasts Submit BS5 v1.0.0 (https://)
 * Author: Rogério Saraceni
 * Licensed under MIT (https://)
 */

const defaultMessages = {
    save: {
        icon: 'bi-check2-circle',
        message: 'Saved successfully!',
        bg: 'bg-success',
        text: 'text-white'
    },
    register: {
        icon: 'bi-check2-circle',
        message: 'Registered successfully!',
        bg: 'bg-success',
        text: 'text-white'
    },
    send: {
        icon: 'bi-check2-circle',
        message: 'Sent successfully!',
        bg: 'bg-primary',
        text: 'text-white'
    },
    edit: {
        icon: 'bi-exclamation-triangle',
        message: 'Edited successfully!',
        bg: 'bg-warning',
        text: 'text-secondary'
    },
    delete: {
        icon: 'bi-x-circle',
        message: 'Deleted successfully!',
        bg: 'bg-danger',
        text: 'text-white'
    },
    info: {
        icon: 'bi-info-circle',
        message: 'Information!',
        bg: 'bg-info',
        text: 'text-white'
    },
    invalid: {
        icon: 'bi-exclamation-triangle',
        message: 'Mandatory fields are not filled in or are invalid!',
        bg: 'bg-danger',
        text: 'text-white'
    }
};

// Objeto global que pode ser sobrescrito
window.ToastB5 = {
    messages: defaultMessages,    

    initToastsBtns() {
        const toastBtns = document.querySelectorAll('[data-toasts="submit"]');
    
        if(toastBtns){
            toastBtns.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    const form = btn.closest('form');
    
                    if (!form.checkValidity()) {
                        this.showDynamicToast('invalid');
                        form.reportValidity();
                    } else {
                        btn.classList.add('btn-spinner-disabled');
                        btn.querySelector('.btn-spinner').classList.remove('d-none');
                        
                        // salva o tipo do toast
                        localStorage.setItem('keyShowToast', btn.value);
    
                        setTimeout(() => {
                            btn.classList.remove('btn-spinner-disabled');
                            btn.querySelector('.btn-spinner').classList.add('d-none');
                            form.submit();
                        }, 1000);
                    }
                });
            });
        }
    },

    getToastContainer() {
        let container = document.querySelector('.toast-container.toast-app');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container toast-app position-fixed top-0 end-0 p-3 z-index-1999';
            document.body.appendChild(container);
        }
        return container;
    },

    showDynamicToast(type) {
        const data = this.messages[type];
        if (!data) return;

        const toastContainer = this.getToastContainer();
        toastContainer.innerHTML = '';

        const toastHTML = `
            <div class="toast ${data.bg} ${data.text} fade hide" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body d-flex align-items-center gap-2">
                        <i class="bi ${data.icon} fs-4"></i>
                        <strong>${data.message}</strong>
                    </div>
                    <button type="button" class="btn-close ${data.text.includes('white') ? 'btn-close-white' : ''} me-2 m-auto" 
                        data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;

        toastContainer.insertAdjacentHTML('beforeend', toastHTML);

        const toastElement = toastContainer.querySelector('.toast');
        new bootstrap.Toast(toastElement, {
            autohide: true,
            delay: 4000
        }).show();
    }
};

// Auto-inicialização
document.addEventListener('DOMContentLoaded', () => {
    if (window.ToastB5) {
        const toastType = localStorage.getItem('keyShowToast');
        if (toastType) {
            window.ToastB5.showDynamicToast(toastType);
            localStorage.removeItem('keyShowToast');
        }
    }
});