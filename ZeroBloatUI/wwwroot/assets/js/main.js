/* =========================================
   1. Global Theme & Navigation Logic
   ========================================= */

// Initialize Theme (Run immediately)
if (localStorage.theme === 'light') {
    document.documentElement.classList.remove('dark');
} else {
    document.documentElement.classList.add('dark');
}

// Toggle (Desktop Button)
function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

// Set Specific Theme (Mobile Buttons)
function setTheme(mode) {
    const html = document.documentElement;
    if (mode === 'dark') {
        html.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        html.classList.remove('dark');
        localStorage.theme = 'light';
    }

    // Update button states
    updateMobileThemeButtons(mode);
}

function updateMobileThemeButtons(mode) {
    const lightBtn = document.getElementById('mobile-light-btn');
    const darkBtn = document.getElementById('mobile-dark-btn');

    if (lightBtn && darkBtn) {
        const baseClasses = "flex items-center justify-center gap-2 p-3 rounded-xl border transition-all font-bold text-sm";
        const inactiveClasses = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 hover:border-blue-500";
        const activeClasses = "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm";

        if (mode === 'light') {
            lightBtn.className = `${baseClasses} ${activeClasses}`;
            darkBtn.className = `${baseClasses} ${inactiveClasses}`;
        } else {
            lightBtn.className = `${baseClasses} ${inactiveClasses}`;
            darkBtn.className = `${baseClasses} ${activeClasses}`;
        }
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('animate-fade-in-up');
            // Sync button states when opening menu
            updateMobileThemeButtons(localStorage.theme === 'light' ? 'light' : 'dark');
        } else {
            menu.classList.add('hidden');
        }
    }
}

/* =========================================
   2. Catalog Page Logic (Filters & Sorting)
   ========================================= */

function toggleFilters() {
    const content = document.getElementById('filterContent');
    const arrow = document.getElementById('filterArrow');
    if (content && arrow) {
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            arrow.classList.add('rotate-180');
        } else {
            content.classList.add('hidden');
            arrow.classList.remove('rotate-180');
        }
    }
}

function toggleSort() {
    const menu = document.getElementById('sortMenu');
    const arrow = document.getElementById('sortArrow');
    if (menu && arrow) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('animate-fade-in-up');
            arrow.classList.add('rotate-180');
        } else {
            menu.classList.add('hidden');
            menu.classList.remove('animate-fade-in-up');
            arrow.classList.remove('rotate-180');
        }
    }
}

function selectSort(element, value) {
    const sortValueInput = document.getElementById('sortValue');
    const sortText = document.getElementById('sortText');

    if (sortValueInput && sortText) {
        sortValueInput.value = value;
        sortText.innerText = value;

        // Reset all options
        const options = document.querySelectorAll('.sort-option');
        options.forEach(opt => {
            opt.classList.remove('text-blue-600', 'font-bold', 'bg-blue-50', 'dark:bg-slate-800/80');
            opt.classList.add('text-slate-600', 'dark:text-slate-300', 'hover:bg-blue-50', 'dark:hover:bg-slate-800');
            const checkIcon = opt.querySelector('.fa-check');
            if (checkIcon) checkIcon.classList.add('hidden');
        });

        // Highlight selected
        element.classList.remove('text-slate-600', 'dark:text-slate-300', 'hover:bg-blue-50', 'dark:hover:bg-slate-800');
        element.classList.add('text-blue-600', 'font-bold', 'bg-blue-50', 'dark:bg-slate-800/80');
        const activeCheck = element.querySelector('.fa-check');
        if (activeCheck) activeCheck.classList.remove('hidden');

        toggleSort();
    }
}

/* =========================================
   3. Review Logic (Preserved)
   ========================================= */

function toggleLike(btn) {
    const icon = btn.querySelector('i');
    const span = btn.querySelector('span');

    if (icon && span) {
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas', 'text-red-500', 'animate-pop');
            btn.classList.add('text-red-500');
            span.innerText = "Helpful (1)";
        } else {
            icon.classList.remove('fas', 'text-red-500', 'animate-pop');
            icon.classList.add('far');
            btn.classList.remove('text-red-500');
            span.innerText = "Helpful?";
        }
    }
}

/* =========================================
   4. Global Event Listeners (Closing Dropdowns)
   ========================================= */

window.onclick = function (event) {
    // Close Catalog Sort Menu
    const sortTrigger = document.getElementById('sortTrigger');
    const sortMenu = document.getElementById('sortMenu');
    if (sortTrigger && sortMenu) {
        if (!sortTrigger.contains(event.target) && !sortMenu.classList.contains('hidden')) {
            toggleSort();
        }
    }
}

/* =========================================
   5. Contact Page Logic (Dropdown & Validation)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Subject Dropdown ---
    const trigger = document.getElementById('subjectTrigger');
    const menu = document.getElementById('subjectMenu');

    if (trigger && menu) {
        const input = document.getElementById('subjectInput');
        const displayIconWrapper = document.getElementById('subjectIcon');
        const displayIcon = displayIconWrapper.querySelector('i');
        const displayText = document.getElementById('subjectText');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = menu.classList.contains('active');
            isOpen ? closeMenu() : openMenu();
        });

        function openMenu() {
            menu.classList.add('active');
            trigger.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            menu.classList.remove('active');
            trigger.setAttribute('aria-expanded', 'false');
        }

        // Expose function globally for HTML onclick attributes
        window.selectSubject = function (value, iconClass, colorClass, bgClass) {
            input.value = value;
            displayText.innerText = value;
            displayIcon.className = `fas ${iconClass}`;
            displayIconWrapper.className = `w-6 h-6 rounded-md flex items-center justify-center text-xs ${bgClass} ${colorClass}`;
            closeMenu();
        }

        window.addEventListener('click', (e) => {
            if (!trigger.contains(e.target) && !menu.contains(e.target)) closeMenu();
        });
    }

    // --- Form Validation Logic ---
    const form = document.getElementById('contactForm');

    if (form) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Helper to show error
        function showError(input, show) {
            const errorMsg = input.parentElement.querySelector('.error-msg');
            if (show) {
                input.classList.add('input-error');
                // Remove default colors to let the red border shine
                input.classList.remove('border-slate-200', 'dark:border-slate-700', 'focus:border-blue-500');
                errorMsg.classList.remove('hidden');
            } else {
                input.classList.remove('input-error');
                input.classList.add('border-slate-200', 'dark:border-slate-700', 'focus:border-blue-500');
                errorMsg.classList.add('hidden');
            }
        }

        // Helper to check email format
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Validate Name
            if (nameInput.value.trim() === '') {
                showError(nameInput, true);
                isValid = false;
            } else {
                showError(nameInput, false);
            }

            // Validate Email
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                showError(emailInput, true);
                isValid = false;
            } else {
                showError(emailInput, false);
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                showError(messageInput, true);
                isValid = false;
            } else {
                showError(messageInput, false);
            }

            if (isValid) {
                // Simulate Success
                const btn = document.getElementById('submitBtn');
                const originalContent = btn.innerHTML;

                btn.innerHTML = `<i class="fas fa-check-circle animate-pop"></i> <span>Message Sent!</span>`;
                btn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                btn.classList.add('bg-green-500', 'hover:bg-green-600');

                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    btn.innerHTML = originalContent;
                    btn.classList.add('bg-blue-600', 'hover:bg-blue-700');
                    btn.classList.remove('bg-green-500', 'hover:bg-green-600');

                    // Reset custom dropdown UI to default
                    if (window.selectSubject) {
                        window.selectSubject('Pre-Sale Question', 'fa-comments', 'text-blue-600', 'bg-blue-100 dark:bg-blue-900/30');
                    }
                }, 3000);
            }
        });

        // Real-time validation removal on input
        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('input', () => showError(input, false));
        });
    }
});