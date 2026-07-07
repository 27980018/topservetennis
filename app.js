// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        window.lucide.createIcons();
    }
    
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Navigation Toggle
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle icon menu / close
            const icon = mobileNavToggle.querySelector('i');
            if (icon) {
                const currentIcon = icon.getAttribute('data-lucide');
                if (currentIcon === 'menu') {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                if (window.lucide) {
                    window.lucide.createIcons();
                }
            }
        });

        // Close menu when clicking a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    if (window.lucide) {
                        window.lucide.createIcons();
                    }
                }
            });
        });
    }

    // Scroll Active Section Highlighter
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Animated Stats Counter
    const statsBar = document.getElementById('stats-bar');
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const suffix = stat.getAttribute('data-suffix') || '';
            const duration = 1500; // 1.5 seconds animation
            const increment = target / (duration / 16); // ~60fps
            
            let current = 0;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.floor(current) + suffix;
                    setTimeout(updateCount, 16);
                } else {
                    stat.innerText = target + suffix;
                }
            };
            updateCount();
        });
    };

    // Trigger stats animation using IntersectionObserver
    if (statsBar && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animateStats();
                    animated = true;
                }
            });
        }, { threshold: 0.2 });

        observer.observe(statsBar);
    } else {
        // Fallback if IntersectionObserver not supported
        setTimeout(animateStats, 1000);
    }

    // Tuition Fee static structure is displayed directly in index.html.

    // Admission Inquiry Form Submission Handlers
    const admissionForm = document.getElementById('admission-inquiry-form');
    const successAlert = document.getElementById('form-success-message');
    const submitBtn = document.getElementById('btn-submit-inquiry');
    const sendWaBtn = document.getElementById('send-wa-btn');
    const sendMailBtn = document.getElementById('send-mail-btn');
    const btnResetForm = document.getElementById('btn-reset-form');

    if (admissionForm && successAlert) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate inputs basic check
            const name = document.getElementById('inquiry-name').value.trim();
            const age = document.getElementById('inquiry-age').value;
            const email = document.getElementById('inquiry-email').value.trim();
            const phone = document.getElementById('inquiry-phone').value.trim();
            const program = document.getElementById('inquiry-program').value;
            const notes = document.getElementById('inquiry-notes').value.trim() || 'No additional details provided';
            
            if (!name || !age || !email || !phone || !program) {
                alert('Please fill out all required fields.');
                return;
            }

            // Simulate form submission
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i data-lucide="loader" class="animate-spin"></i> Submitting...';
                if (window.lucide) window.lucide.createIcons();
            }

            setTimeout(() => {
                // Formulate text message for WhatsApp
                const rawWaText = `Hello Top Serve Tennis Academy! I am submitting an admission enquiry via the website:\n\n👤 Player Name: ${name}\n🎂 Player Age: ${age}\n📋 Selected Program: ${program}\n📞 Contact Phone: ${phone}\n✉️ Email Address: ${email}\n📝 Experience & Goals: ${notes}`;
                const encodedWaText = encodeURIComponent(rawWaText);
                
                // Set WhatsApp link (Direct mobile message to Coach Manjunath)
                if (sendWaBtn) {
                    sendWaBtn.href = `https://wa.me/919964997716?text=${encodedWaText}`;
                }

                // Formulate subject & body for Email
                const rawMailSubject = `Admission Inquiry - ${name}`;
                const rawMailBody = `Hello Coach Manjunath,\n\nI would like to submit an admission enquiry for Top Serve Tennis Academy. Details:\n\nPlayer Name: ${name}\nPlayer Age: ${age}\nSelected Program: ${program}\nContact Phone: ${phone}\nEmail: ${email}\nExperience & Goals: ${notes}\n\nThank you.`;
                const encodedMailSubject = encodeURIComponent(rawMailSubject);
                const encodedMailBody = encodeURIComponent(rawMailBody);

                // Set Email link (mailto: to tennistopserve@gmail.com)
                if (sendMailBtn) {
                    sendMailBtn.href = `mailto:tennistopserve@gmail.com?subject=${encodedMailSubject}&body=${encodedMailBody}`;
                }

                // Hide form and display success alert
                admissionForm.classList.add('hidden');
                successAlert.classList.remove('hidden');
                
                // Re-enable and reset submit button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Submit Admission Inquiry <i data-lucide="chevron-right"></i>';
                }
                
                if (window.lucide) {
                    window.lucide.createIcons();
                }

                // Smooth scroll to the success alert
                successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1000);
        });

        // Add reset event listener
        if (btnResetForm) {
            btnResetForm.addEventListener('click', () => {
                admissionForm.reset();
                successAlert.classList.add('hidden');
                admissionForm.classList.remove('hidden');
                admissionForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    // Auto-select program if coming from Fitness Booking CTA
    const btnFitBooking = document.querySelector('.btn-fit-booking');
    const inquiryProgramSelect = document.getElementById('inquiry-program');
    if (btnFitBooking && inquiryProgramSelect) {
        btnFitBooking.addEventListener('click', () => {
            inquiryProgramSelect.value = 'Adult Fitness Session';
        });
    }

    // Testimonials Carousel/Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const sliderDots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    let currentSlide = 0;
    let autoSlideInterval;

    const showSlide = (index) => {
        // Reset index bounds
        if (index >= testimonialSlides.length) currentSlide = 0;
        else if (index < 0) currentSlide = testimonialSlides.length - 1;
        else currentSlide = index;

        // Toggle active classes
        testimonialSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === currentSlide) slide.classList.add('active');
        });

        // Toggle dot indicator active class
        sliderDots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === currentSlide) dot.classList.add('active');
        });
    };

    const nextSlide = () => {
        showSlide(currentSlide + 1);
    };

    const prevSlide = () => {
        showSlide(currentSlide - 1);
    };

    // Add click listeners to arrows
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    // Add click listeners to dots
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Start auto slider
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 6000); // changes every 6s
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    if (testimonialSlides.length > 0) {
        startAutoSlide();
    }

    // ==========================================
    // ADMIN PORTAL & DYNAMIC FEED MANAGEMENT
    // ==========================================
    const adminGate = document.getElementById('admin-gate');
    const loginFormContainer = document.getElementById('admin-login-form-container');
    const registerFormContainer = document.getElementById('admin-register-form-container');
    
    const loginForm = document.getElementById('admin-login-form');
    const registerForm = document.getElementById('admin-register-form');
    
    const loginAdminId = document.getElementById('gate-admin-id');
    const loginPassword = document.getElementById('gate-password');
    
    const registerAdminId = document.getElementById('register-admin-id');
    const registerPassword = document.getElementById('register-password');
    const registerConfirmPassword = document.getElementById('register-confirm-password');
    const registerMasterKey = document.getElementById('register-master-key');
    
    const toggleToRegister = document.getElementById('toggle-to-register');
    const toggleToLogin = document.getElementById('toggle-to-login');
    
    const gateError = document.getElementById('gate-error');
    const gateSuccess = document.getElementById('gate-success');
    const adminDashboard = document.getElementById('admin-dashboard');
    const btnLogoutPortal = document.getElementById('btn-logout-portal');

    // Ensure default credentials exist in localStorage (and clean up old single-user keys)
    let adminAccounts = JSON.parse(localStorage.getItem('adminAccounts'));
    if (!adminAccounts || !Array.isArray(adminAccounts)) {
        adminAccounts = [
            { id: 'admin', password: 'Manju0555Topserve' }
        ];
        localStorage.setItem('adminAccounts', JSON.stringify(adminAccounts));
    }
    // Migrate single-user keys if present
    if (localStorage.getItem('adminId') && localStorage.getItem('adminId') !== 'admin') {
        const savedId = localStorage.getItem('adminId');
        const savedPwd = localStorage.getItem('adminPassword') || 'Manju0555Topserve';
        if (!adminAccounts.some(acc => acc.id === savedId)) {
            adminAccounts.push({ id: savedId, password: savedPwd });
            localStorage.setItem('adminAccounts', JSON.stringify(adminAccounts));
        }
        localStorage.removeItem('adminId');
        localStorage.removeItem('adminPassword');
    }

    // Toggle between login and registration forms
    if (toggleToRegister) {
        toggleToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginFormContainer.classList.add('hidden');
            registerFormContainer.classList.remove('hidden');
            gateError.classList.add('hidden');
            gateSuccess.classList.add('hidden');
        });
    }

    if (toggleToLogin) {
        toggleToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerFormContainer.classList.add('hidden');
            loginFormContainer.classList.remove('hidden');
            gateError.classList.add('hidden');
            gateSuccess.classList.add('hidden');
        });
    }

    // Handle Admin Registration
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            gateError.classList.add('hidden');
            gateSuccess.classList.add('hidden');

            const newId = registerAdminId.value.trim();
            const newPwd = registerPassword.value;
            const confirmPwd = registerConfirmPassword.value;
            const masterKey = registerMasterKey.value.trim();

            // Verification of secure Master Key (acts as authorization)
            if (masterKey !== 'TOPSERVE@MANDYA') {
                gateError.textContent = "Unauthorized: Incorrect Master Registration Key.";
                gateError.classList.remove('hidden');
                return;
            }

            if (newPwd !== confirmPwd) {
                gateError.textContent = "Passwords do not match. Please try again.";
                gateError.classList.remove('hidden');
                return;
            }

            let currentAdmins = JSON.parse(localStorage.getItem('adminAccounts')) || [];

            // Check if admin ID already exists
            const exists = currentAdmins.some(acc => acc.id.toLowerCase() === newId.toLowerCase());
            if (exists) {
                gateError.textContent = "Admin ID already exists. Choose a different ID.";
                gateError.classList.remove('hidden');
                return;
            }

            // Limit check: Maximum of 2 admin accounts allowed in the system
            if (currentAdmins.length >= 2) {
                gateError.textContent = "Registration blocked: Maximum limit of 2 admin accounts reached.";
                gateError.classList.remove('hidden');
                return;
            }

            // Add new admin
            currentAdmins.push({ id: newId, password: newPwd });
            localStorage.setItem('adminAccounts', JSON.stringify(currentAdmins));

            // Display success and toggle to login form
            gateSuccess.textContent = `Admin "${newId}" registered successfully! (Account 2 of 2)`;
            gateSuccess.classList.remove('hidden');

            registerAdminId.value = '';
            registerPassword.value = '';
            registerConfirmPassword.value = '';
            registerMasterKey.value = '';

            setTimeout(() => {
                registerFormContainer.classList.add('hidden');
                loginFormContainer.classList.remove('hidden');
            }, 1500);
        });
    }

    // Handle Admin Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            gateError.classList.add('hidden');
            gateSuccess.classList.add('hidden');

            const enteredId = loginAdminId.value.trim();
            const enteredPwd = loginPassword.value;

            const currentAdmins = JSON.parse(localStorage.getItem('adminAccounts')) || [
                { id: 'admin', password: 'Manju0555Topserve' }
            ];

            // Verify if credentials match any account in the list
            const validAccount = currentAdmins.find(acc => acc.id.toLowerCase() === enteredId.toLowerCase() && acc.password === enteredPwd);

            if (validAccount) {
                adminGate.classList.add('hidden');
                adminDashboard.classList.remove('hidden');
                loginAdminId.value = '';
                loginPassword.value = '';
            } else {
                gateError.textContent = "Incorrect Admin ID or Password.";
                gateError.classList.remove('hidden');
            }
        });
    }

    // Handle Admin Logout
    if (btnLogoutPortal) {
        btnLogoutPortal.addEventListener('click', () => {
            adminDashboard.classList.add('hidden');
            adminGate.classList.remove('hidden');
            gateError.classList.add('hidden');
            gateSuccess.classList.add('hidden');
        });
    }

    // Media Array definition & localStorage persistence
    let mediaItems = JSON.parse(localStorage.getItem('galleryMediaItems'));
    
    // OVERWRITE/MIGRATION: Ensure gallery media items only contain the kids video and advance training video for now
    const hasBothVideos = mediaItems && 
                          mediaItems.length === 2 && 
                          mediaItems.some(i => i.src === "kids video.mp4") && 
                          mediaItems.some(i => i.src === "advance training video.mp4");
                          
    if (!hasBothVideos) {
        mediaItems = [
            {
                id: 5,
                src: "kids video.mp4",
                alt: "Kids Agility & Stamina Training",
                category: "Activities",
                caption: "⚡ Future Champions in action! Our junior academy trainees pushing hard with agility footwork drills on the PET courts. High energy only!",
                isVideo: true
            },
            {
                id: 6,
                src: "advance training video.mp4",
                alt: "Advanced Tennis Drill",
                category: "Activities",
                caption: "🚀 High-intensity rally drills! Advanced academy prospects refining baseline depth and offensive shot selection under the lights.",
                isVideo: true
            }
        ];
        localStorage.setItem('galleryMediaItems', JSON.stringify(mediaItems));
    }

    // State variable to track if we are editing an item
    let editingItemId = null;

    const instaGrid = document.querySelector('.insta-grid');
    const manageItemsList = document.getElementById('manage-items-list');

    // Function to render the public Instagram grid dynamically
    function renderPublicGrid() {
        if (!instaGrid) return;
        instaGrid.innerHTML = '';

        mediaItems.forEach(item => {
            const gridItem = document.createElement('div');
            
            if (item.isVideo) {
                // A vertical 9:16 aspect ratio card with custom interactive play/pause, mute/unmute, and caption
                gridItem.className = 'insta-item video-gallery-item';
                gridItem.style.aspectRatio = '9/16';
                gridItem.style.maxWidth = '320px';
                gridItem.style.margin = '0 auto';
                
                gridItem.innerHTML = `
                    <video class="gallery-video-player" src="${item.src}" loop playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
                    
                    <!-- Bottom Gradient Overlay for Caption -->
                    <div class="video-overlay-gradient"></div>
                    
                    <!-- Custom Interactive Controls Overlay -->
                    <div class="video-custom-controls">
                        <!-- Play/Pause Button -->
                        <button class="control-btn play-pause-btn" aria-label="Play/Pause">
                            <i data-lucide="play" class="play-icon"></i>
                            <i data-lucide="pause" class="pause-icon hidden"></i>
                        </button>
                        
                        <!-- Mute/Unmute Button -->
                        <button class="control-btn mute-unmute-btn" aria-label="Mute/Unmute">
                            <i data-lucide="volume-x" class="mute-icon"></i>
                            <i data-lucide="volume-2" class="unmute-icon hidden"></i>
                        </button>
                    </div>
                    
                    <!-- Caption Overlay -->
                    <div class="video-caption-overlay">
                        <span class="video-tag-badge">${item.category}</span>
                        <p class="video-caption-text">${item.caption}</p>
                    </div>
                `;
            } else {
                // Photo item keeping original ratio
                gridItem.className = 'insta-item photo-gallery-item';
                gridItem.style.aspectRatio = 'auto';
                gridItem.innerHTML = `
                    <img src="${item.src}" alt="${item.alt}" style="width: 100%; height: auto; object-fit: contain;">
                    <div class="insta-hover">
                        <div class="insta-stats">
                            <span><i data-lucide="${getIconForCategory(item.category)}"></i> ${item.category}</span>
                        </div>
                        <p class="insta-post-caption">${item.caption}</p>
                    </div>
                `;
            }

            instaGrid.appendChild(gridItem);
        });

        // Bind custom video controls
        const videoCards = instaGrid.querySelectorAll('.video-gallery-item');
        videoCards.forEach(card => {
            const video = card.querySelector('.gallery-video-player');
            const playPauseBtn = card.querySelector('.play-pause-btn');
            const muteUnmuteBtn = card.querySelector('.mute-unmute-btn');
            
            const playIcon = playPauseBtn.querySelector('.play-icon');
            const pauseIcon = playPauseBtn.querySelector('.pause-icon');
            const muteIcon = muteUnmuteBtn.querySelector('.mute-icon');
            const unmuteIcon = muteUnmuteBtn.querySelector('.unmute-icon');

            // Set initial state (start paused, muted)
            video.muted = true;
            
            // Play/Pause Click Handler (Button or Video itself)
            const togglePlay = () => {
                if (video.paused) {
                    video.play().catch(err => console.log('Auto-play check:', err));
                    playIcon.classList.add('hidden');
                    pauseIcon.classList.remove('hidden');
                } else {
                    video.pause();
                    playIcon.classList.remove('hidden');
                    pauseIcon.classList.add('hidden');
                }
            };
            
            playPauseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                togglePlay();
            });
            
            video.addEventListener('click', () => {
                togglePlay();
            });

            // Mute/Unmute Click Handler
            muteUnmuteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                video.muted = !video.muted;
                if (video.muted) {
                    muteIcon.classList.remove('hidden');
                    unmuteIcon.classList.add('hidden');
                } else {
                    muteIcon.classList.add('hidden');
                    unmuteIcon.classList.remove('hidden');
                }
            });
        });

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    function getIconForCategory(cat) {
        switch(cat) {
            case 'Achievements': return 'award';
            case 'Activities': return 'users';
            case 'Fitness': return 'activity';
            default: return 'image';
        }
    }

    // Function to render the Admin Management dashboard list rows
    function renderAdminList() {
        if (!manageItemsList) return;
        manageItemsList.innerHTML = '';

        if (mediaItems.length === 0) {
            manageItemsList.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 20px 0;">No active items in the gallery. Upload some above!</p>';
            return;
        }

        mediaItems.forEach(item => {
            const itemRow = document.createElement('div');
            itemRow.className = 'manage-item-row';

            let previewTag = '';
            if (item.isVideo) {
                previewTag = `<video src="${item.src}" muted></video>`;
            } else {
                previewTag = `<img src="${item.src}" alt="Thumbnail">`;
            }

            itemRow.innerHTML = `
                <div class="manage-item-left">
                    <div class="manage-item-thumbnail">
                        ${previewTag}
                    </div>
                    <div class="manage-item-info">
                        <div class="manage-item-title">${item.caption}</div>
                        <span class="manage-item-tag">${item.category}</span>
                    </div>
                </div>
                <div class="manage-item-actions">
                    <button type="button" class="btn-edit-item" data-id="${item.id}" aria-label="Edit item">
                        <i data-lucide="edit-3"></i>
                    </button>
                    <button type="button" class="btn-delete-item" data-id="${item.id}" aria-label="Delete item">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            `;
            manageItemsList.appendChild(itemRow);
        });

        // Add edit event listeners
        const editButtons = manageItemsList.querySelectorAll('.btn-edit-item');
        editButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToEdit = parseInt(btn.getAttribute('data-id'));
                startEditingItem(idToEdit);
            });
        });

        // Add delete event listeners
        const deleteButtons = manageItemsList.querySelectorAll('.btn-delete-item');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToDelete = parseInt(btn.getAttribute('data-id'));
                if (confirm('Are you sure you want to delete this item?')) {
                    // If we are currently editing the deleted item, cancel editing
                    if (editingItemId === idToDelete) {
                        cancelEditing();
                    }
                    // Filter array
                    mediaItems = mediaItems.filter(item => item.id !== idToDelete);
                    localStorage.setItem('galleryMediaItems', JSON.stringify(mediaItems));
                    // Re-render
                    renderPublicGrid();
                    renderAdminList();
                }
            });
        });

        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    // Initialize dropzone elements
    const fileDropzone = document.getElementById('file-dropzone');
    const uploadFileInput = document.getElementById('upload-file-input');
    const dropzonePrompt = document.getElementById('dropzone-prompt');
    const dropzonePreview = document.getElementById('dropzone-preview');
    const btnRemovePreview = document.getElementById('btn-remove-preview');
    let selectedFile = null;
    let selectedFileUrl = '';

    if (fileDropzone && uploadFileInput) {
        // Open file selector when clicking the dropzone (but check click targets so remove button doesn't trigger it)
        fileDropzone.addEventListener('click', (e) => {
            if (e.target.closest('#btn-remove-preview')) return;
            uploadFileInput.click();
        });

        // Drag and drop event styling listeners
        fileDropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileDropzone.classList.add('dragover');
        });

        ['dragleave', 'dragend', 'drop'].forEach(evt => {
            fileDropzone.addEventListener(evt, () => {
                fileDropzone.classList.remove('dragover');
            });
        });

        // Handle dropped files
        fileDropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) {
                handleFile(e.dataTransfer.files[0]);
            }
        });

        // Handle selected files
        uploadFileInput.addEventListener('change', () => {
            if (uploadFileInput.files.length) {
                handleFile(uploadFileInput.files[0]);
            }
        });
    }

    function handleFile(file) {
        if (!file) return;
        selectedFile = file;
        selectedFileUrl = URL.createObjectURL(file);

        // Hide prompt and show preview
        dropzonePrompt.classList.add('hidden');
        dropzonePreview.classList.remove('hidden');

        // Clear existing preview children (keep the delete button)
        const existingMedia = dropzonePreview.querySelector('img, video');
        if (existingMedia) {
            existingMedia.remove();
        }

        if (file.type.startsWith('video/')) {
            const videoPreview = document.createElement('video');
            videoPreview.src = selectedFileUrl;
            videoPreview.controls = true;
            videoPreview.muted = true;
            videoPreview.playsInline = true;
            dropzonePreview.insertBefore(videoPreview, btnRemovePreview);
        } else {
            const imgPreview = document.createElement('img');
            imgPreview.src = selectedFileUrl;
            imgPreview.alt = "Upload Preview";
            dropzonePreview.insertBefore(imgPreview, btnRemovePreview);
        }
    }

    if (btnRemovePreview) {
        btnRemovePreview.addEventListener('click', (e) => {
            e.stopPropagation();
            resetDropzone();
        });
    }

    function resetDropzone() {
        selectedFile = null;
        if (selectedFileUrl) {
            URL.revokeObjectURL(selectedFileUrl);
            selectedFileUrl = '';
        }
        uploadFileInput.value = '';
        dropzonePreview.classList.add('hidden');
        dropzonePrompt.classList.remove('hidden');

        const existingMedia = dropzonePreview.querySelector('img, video');
        if (existingMedia) {
            existingMedia.remove();
        }
    }

    // Cancel Edit Button
    const btnCancelEdit = document.getElementById('btn-cancel-edit');
    const uploadSectionTitle = document.querySelector('.upload-col h3');
    const btnPublishMedia = document.getElementById('btn-publish-media');

    // Function to start editing an item
    function startEditingItem(id) {
        const item = mediaItems.find(i => i.id === id);
        if (!item) return;

        editingItemId = id;

        // Populate text inputs
        uploadCaption.value = item.caption;
        uploadCategory.value = item.category;

        // Clear existing file selection preview
        resetDropzone();

        // Show existing media in dropzone preview
        dropzonePrompt.classList.add('hidden');
        dropzonePreview.classList.remove('hidden');

        // Remove old images/videos from preview
        const oldPreviewMedia = dropzonePreview.querySelectorAll('img, video');
        oldPreviewMedia.forEach(el => el.remove());

        if (item.isVideo) {
            const videoPreview = document.createElement('video');
            videoPreview.src = item.src;
            videoPreview.controls = true;
            videoPreview.muted = true;
            dropzonePreview.insertBefore(videoPreview, btnRemovePreview);
        } else {
            const imgPreview = document.createElement('img');
            imgPreview.src = item.src;
            imgPreview.alt = "Current Image";
            dropzonePreview.insertBefore(imgPreview, btnRemovePreview);
        }

        // Change section title and submit button text
        if (uploadSectionTitle) {
            uploadSectionTitle.innerHTML = '<i data-lucide="edit-3"></i> Edit Media Item';
            if (window.lucide) window.lucide.createIcons();
        }
        if (btnPublishMedia) {
            btnPublishMedia.innerHTML = 'Save Changes <i data-lucide="check-circle"></i>';
            if (window.lucide) window.lucide.createIcons();
        }

        // Show Cancel button
        if (btnCancelEdit) {
            btnCancelEdit.classList.remove('hidden');
        }

        // Scroll to the upload form so the user sees it
        const uploadCol = document.querySelector('.upload-col');
        if (uploadCol) {
            uploadCol.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Function to cancel editing
    function cancelEditing() {
        editingItemId = null;
        uploadCaption.value = '';
        resetDropzone();

        // Reset title and button text
        if (uploadSectionTitle) {
            uploadSectionTitle.innerHTML = '<i data-lucide="upload-cloud"></i> Upload New Media';
            if (window.lucide) window.lucide.createIcons();
        }
        if (btnPublishMedia) {
            btnPublishMedia.innerHTML = 'Publish to Gallery Grid <i data-lucide="send"></i>';
            if (window.lucide) window.lucide.createIcons();
        }

        // Hide Cancel button
        if (btnCancelEdit) {
            btnCancelEdit.classList.add('hidden');
        }
    }

    if (btnCancelEdit) {
        btnCancelEdit.addEventListener('click', cancelEditing);
    }

    // Upload Form Submit
    const adminUploadForm = document.getElementById('admin-upload-form');
    const uploadCaption = document.getElementById('upload-caption');
    const uploadCategory = document.getElementById('upload-category');

    if (adminUploadForm) {
        adminUploadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate that we have a file selected if we are in CREATE mode
            if (editingItemId === null && !selectedFile) {
                alert('Please select or drop an image/video file to upload.');
                return;
            }

            const captionValue = uploadCaption.value.trim();
            const categoryValue = uploadCategory.value;

            // Helper function to save and re-render
            const saveAndRender = (srcVal, isVideoVal) => {
                if (editingItemId !== null) {
                    // EDIT MODE: Update existing item
                    mediaItems = mediaItems.map(item => {
                        if (item.id === editingItemId) {
                            return {
                                ...item,
                                src: srcVal || item.src,
                                alt: captionValue,
                                category: categoryValue,
                                caption: captionValue,
                                isVideo: srcVal ? isVideoVal : item.isVideo
                            };
                        }
                        return item;
                    });
                    alert('Media item updated successfully!');
                } else {
                    // CREATE MODE: Create new item
                    const newItem = {
                        id: Date.now(),
                        src: srcVal,
                        alt: captionValue,
                        category: categoryValue,
                        caption: captionValue,
                        isVideo: isVideoVal
                    };
                    mediaItems.unshift(newItem);
                    alert('Media published successfully to the gallery!');
                }

                // Save to localStorage
                localStorage.setItem('galleryMediaItems', JSON.stringify(mediaItems));

                // Re-render components
                renderPublicGrid();
                renderAdminList();

                // Reset editing state and form fields
                cancelEditing();
            };

            // If a file was selected, read it as Base64. Otherwise, save text-only changes (valid in edit mode)
            if (selectedFile) {
                const isVideo = selectedFile.type.startsWith('video/');
                
                // Warn user if file is too large (over 1.5MB) for localStorage
                if (selectedFile.size > 1.5 * 1024 * 1024) {
                    if (!confirm('This file is larger than 1.5MB. Storing large files in browser storage might exceed capacity. Do you want to continue?')) {
                        return;
                    }
                }

                const reader = new FileReader();
                reader.onload = function(evt) {
                    const base64Data = evt.target.result;
                    saveAndRender(base64Data, isVideo);
                };
                reader.onerror = function() {
                    alert('Error reading file. Please try again.');
                };
                reader.readAsDataURL(selectedFile);
            } else {
                // Edit mode text-only update
                saveAndRender(null, false);
            }
        });
    }

    // ==========================================
    // AWARD CEREMONY LIGHTBOX MODAL
    // ==========================================
    const awardModal = document.getElementById('award-modal');
    const awardTrigger = document.getElementById('coach-award-trigger');
    const awardBadgeTrigger = document.getElementById('view-award-badge');
    const modalCloseBtn = document.getElementById('modal-close');

    if (awardModal && modalCloseBtn) {
        const openModal = () => {
            awardModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Disable scroll on page
        };

        const closeModal = () => {
            awardModal.classList.add('hidden');
            document.body.style.overflow = ''; // Enable scroll on page
        };

        if (awardTrigger) {
            awardTrigger.addEventListener('click', openModal);
        }
        if (awardBadgeTrigger) {
            awardBadgeTrigger.addEventListener('click', openModal);
        }

        modalCloseBtn.addEventListener('click', closeModal);
        awardModal.addEventListener('click', (e) => {
            // Close if clicking outside the modal wrapper
            if (e.target === awardModal) {
                closeModal();
            }
        });

        // Close on Escape key press
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !awardModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    // ==========================================
    // VIEWPORT SWITCHER (DESKTOP/MOBILE MODE)
    // ==========================================
    const viewportToggleBtn = document.getElementById('viewport-toggle-btn');
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    
    if (viewportToggleBtn && viewportMeta) {
        const desktopIcon = viewportToggleBtn.querySelector('.desktop-icon');
        const mobileIcon = viewportToggleBtn.querySelector('.mobile-icon');
        const tooltip = viewportToggleBtn.querySelector('.toggle-tooltip');
        
        // Check saved mode in localStorage
        let currentMode = localStorage.getItem('viewportMode') || 'mobile';
        
        const setViewportMode = (mode) => {
            if (mode === 'desktop') {
                // Set viewport to fixed desktop width
                viewportMeta.setAttribute('content', 'width=1200, initial-scale=0.3, shrink-to-fit=no');
                
                // Update UI icons & tooltip
                desktopIcon.classList.add('hidden');
                mobileIcon.classList.remove('hidden');
                tooltip.textContent = 'Switch to Mobile View';
                viewportToggleBtn.setAttribute('title', 'Switch to Mobile View');
                
                // Add class to body to handle style changes if needed
                document.body.classList.add('forced-desktop');
                localStorage.setItem('viewportMode', 'desktop');
            } else {
                // Restore responsive viewport
                viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0');
                
                // Update UI icons & tooltip
                mobileIcon.classList.add('hidden');
                desktopIcon.classList.remove('hidden');
                tooltip.textContent = 'Switch to Desktop View';
                viewportToggleBtn.setAttribute('title', 'Switch to Desktop View');
                
                // Remove forced desktop body class
                document.body.classList.remove('forced-desktop');
                localStorage.setItem('viewportMode', 'mobile');
            }
            currentMode = mode;
        };

        // Initialize state
        setViewportMode(currentMode);

        viewportToggleBtn.addEventListener('click', () => {
            if (currentMode === 'mobile') {
                setViewportMode('desktop');
            } else {
                setViewportMode('mobile');
            }
        });
    }

    // ==========================================
    // FITNESS REGISTRATION CONTROLLER
    // ==========================================
    const fitForm = document.getElementById('fitness-register-form');
    const fitFormContainer = document.getElementById('fit-form-container');
    const fitSuccessMsg = document.getElementById('fit-success-message');
    const fitSendWa = document.getElementById('fit-send-wa');
    const fitBtnReset = document.getElementById('fit-btn-reset');

    if (fitForm && fitSuccessMsg && fitSendWa) {
        fitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('fit-reg-name').value.trim();
            const phone = document.getElementById('fit-reg-phone').value.trim();
            const program = document.getElementById('fit-reg-program').value;
            
            if (!name || !phone || !program) {
                alert('Please fill in all required fields.');
                return;
            }

            // Formulate WhatsApp message text
            const rawWaText = `Hello Coach Harshitha! I would like to register for the Top Serve Fitness program:\n\n👤 Player Name: ${name}\n📞 Contact Phone: ${phone}\n💪 Registered Program: ${program}`;
            const encodedText = encodeURIComponent(rawWaText);
            
            // Set WhatsApp link (Direct mobile message to Coach Harshitha / Admin)
            fitSendWa.href = `https://wa.me/919964997716?text=${encodedText}`;

            // Hide form and display success view
            fitFormContainer.classList.add('hidden');
            fitSuccessMsg.classList.remove('hidden');
        });

        if (fitBtnReset) {
            fitBtnReset.addEventListener('click', () => {
                fitForm.reset();
                fitSuccessMsg.classList.add('hidden');
                fitFormContainer.classList.remove('hidden');
            });
        }
    }

    // Initialize the dynamic grid rendering
    renderPublicGrid();
    renderAdminList();
});
