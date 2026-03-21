// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navbar Blur Effect on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '0';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.85)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        navbar.style.padding = '0';
    }
});

// GSAP Animations
document.addEventListener("DOMContentLoaded", (event) => {

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    ScrollTrigger.create({
        trigger: ".stats-counter",
        start: "top 80%",
        onEnter: () => {
            if (!counted) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    gsap.to(counter, {
                        innerHTML: target,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: "power1.inOut",
                        onUpdate: function () {
                            counter.innerHTML = Math.round(this.targets()[0].innerHTML);
                        }
                    });
                });
                counted = true;
            }
        }
    });
});

// ROI Calculator
const docSlider = document.getElementById('docSlider');
const docCount = document.getElementById('docCount');
const patSlider = document.getElementById('patSlider');
const patCount = document.getElementById('patCount');
const savingsAmount = document.getElementById('savingsAmount');

function calculateROI() {
    const doctors = parseInt(docSlider.value);
    const patients = parseInt(patSlider.value);

    docCount.textContent = doctors;
    patCount.textContent = patients;

    // Formula: (Doctors * Patients * avg_savings_per_patient) + fixed_software_savings
    // Assume ₹500 saved per patient processing/billing + ₹50,000 base savings
    const savings = (doctors * patients * 500) + 50000;

    // Animate the number change
    gsap.to(savingsAmount, {
        innerHTML: savings,
        duration: 0.5,
        snap: { innerHTML: 1 },
        onUpdate: function () {
            savingsAmount.textContent = "₹" + parseInt(this.targets()[0].innerHTML).toLocaleString('en-IN');
        }
    });
}

if (docSlider && patSlider) {
    docSlider.addEventListener('input', calculateROI);
    patSlider.addEventListener('input', calculateROI);
    // Initial calculation
    calculateROI();
}

// Chatbot Logic
const chatToggle = document.querySelector('.chat-toggle');
const chatWindow = document.querySelector('.chat-window');
const closeChat = document.querySelector('.close-chat');
const chatMsg = document.getElementById('chatMsg');
const sendBtn = document.getElementById('sendBtn');
const chatBody = document.getElementById('chatBody');

if (chatToggle && chatWindow && closeChat) {
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    function sendMessage() {
        const text = chatMsg.value.trim();
        if (text !== "") {
            // Append User message
            const userDiv = document.createElement('div');
            userDiv.className = 'msg sent';
            userDiv.innerText = text;
            chatBody.appendChild(userDiv);
            chatMsg.value = "";
            chatBody.scrollTop = chatBody.scrollHeight;

            // Simulate Bot reply
            setTimeout(() => {
                const botDiv = document.createElement('div');
                botDiv.className = 'msg received';

                let reply = "I'm the HIMS AI Assistant! Ask me concerning hospital features, pricing, telemedicine, patient records, billing, or scheduling!";
                const lowerText = text.toLowerCase();

                if (lowerText.includes('demo') || lowerText.includes('book')) {
                    reply = "I'd be happy to arrange a live demo! Could you please provide your work email address, or click 'Request Demo' at the top?";
                } else if (lowerText.includes('trial') || lowerText.includes('free')) {
                    reply = "Awesome! To set up your 14-day free trial, what is the best email to reach you at?";
                } else if (lowerText.includes('sales') || lowerText.includes('contact')) {
                    reply = "Our sales and support teams are ready to help. Please share your email address and we'll be in touch.";
                } else if (lowerText.includes('pricing') || lowerText.includes('cost') || lowerText.includes('price') || lowerText.includes('fees')) {
                    reply = "Our pricing starts at ₹4,999/mo for basic clinics, up to custom pricing for Enterprise hospitals. Would you like a detailed quote?";
                } else if (lowerText.includes('telemedicine') || lowerText.includes('video') || lowerText.includes('call') || lowerText.includes('online')) {
                    reply = "Our built-in Telemedicine platform supports HD video calls, instant e-prescriptions, and seamless EHR integration. No third-party apps needed!";
                } else if (lowerText.includes('billing') || lowerText.includes('payment') || lowerText.includes('invoice') || lowerText.includes('money')) {
                    reply = "HIMS fully automates billing! We reduce claims errors, speed up the revenue cycle, and support secure online patient payments via credit/debit/UPI.";
                } else if (lowerText.includes('inventory') || lowerText.includes('pharmacy') || lowerText.includes('medicine') || lowerText.includes('stock')) {
                    reply = "Our Pharmacy module tracks stock alerts in real-time, manages suppliers, predicts low stock using AI, and greatly minimizes medication wastage.";
                } else if (lowerText.includes('appointment') || lowerText.includes('schedule') || lowerText.includes('booking')) {
                    reply = "Patients can book appointments via our portal 24/7. It syncs directly with doctors' calendars to reduce no-shows and optimize your daily patient load.";
                } else if (lowerText.includes('security') || lowerText.includes('hipaa') || lowerText.includes('safe') || lowerText.includes('privacy') || lowerText.includes('data')) {
                    reply = "Data security is our top priority. The HIMS platform is fully HIPAA-compliant, featuring end-to-end cloud encryption, backups, and role-based access.";
                } else if (lowerText.includes('patient') || lowerText.includes('ehr') || lowerText.includes('emr') || lowerText.includes('record') || lowerText.includes('history')) {
                    reply = "Our Digital Health Records (EHR) system gives doctors 1-click access to complete patient history, lab results, past medications, and visit notes.";
                } else if (lowerText.includes('roi') || lowerText.includes('return') || lowerText.includes('save') || lowerText.includes('savings')) {
                    reply = "HIMS typically saves mid-sized clinics up to 120+ hours of administrative work and boosts revenue capture by up to 12% monthly by preventing leakage!";
                } else if (lowerText.includes('hello') || lowerText.includes('hi ') || lowerText.includes('hey') || lowerText.includes('hi')) {
                    reply = "Hello there! I'm the HIMS AI. How can I help you transform your hospital today?";
                } else if (lowerText.includes('thank')) {
                    reply = "You're very welcome! Let me know if you have any other questions.";
                } else if (lowerText.includes('@')) {
                    reply = "Thank you! I've securely noted your email. Our team will contact you shortly. Is there anything else I can help you with?";
                } else {
                    reply = "That's a great question! I am still learning about that specific topic. If you leave your email or request a demo, our human healthcare experts will answer this for you right away!";
                }

                botDiv.innerText = reply;
                chatBody.appendChild(botDiv);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    chatMsg.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Auto-open Chatbot for Sales buttons only
    const demoBtns = document.querySelectorAll('.btn');
    demoBtns.forEach(btn => {
        if (btn.innerText.includes('Sales')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                chatWindow.classList.add('active');
                chatMsg.value = "I'd like to contact sales.";
                setTimeout(() => {
                    sendMessage();
                }, 300);
            });
        }
    });
}

// Telemedicine Controls Logic
const micBtn = document.getElementById('micBtn');
const camBtn = document.getElementById('camBtn');
const endBtn = document.getElementById('endBtn');
const patientCam = document.getElementById('patientCam');
const mainVideo = document.getElementById('mainVideo');

// Voice UI Elements
const voiceIndicator = document.getElementById('voiceIndicator');
const voiceStatus = document.getElementById('voiceStatus');
const doctorCaption = document.getElementById('doctorCaption');

if (micBtn && camBtn && endBtn) {
    let micOn = false; // Start with mic OFF
    let camOn = true;

    // Set initial mic visually off
    micBtn.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
    micBtn.style.color = '#EF4444';

    // Speech Recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;

    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = function () {
            if (voiceIndicator) {
                voiceIndicator.classList.add('listening');
                voiceStatus.innerText = "Listening...";
            }
            if (doctorCaption) doctorCaption.classList.remove('show');
        };

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript.toLowerCase();
            if (voiceIndicator) {
                voiceIndicator.classList.remove('listening');
                voiceStatus.innerText = "Processing...";
            }

            setTimeout(() => {
                respondToUser(transcript);
            }, 600);
        };

        recognition.onerror = function (event) {
            if (voiceIndicator) {
                voiceIndicator.classList.remove('listening');
                voiceStatus.innerText = "Microphone error or no speech detected.";
            }
            micOn = false;
            micBtn.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
            micBtn.style.color = '#EF4444';
        };
    }

    function respondToUser(text) {
        let reply = "I understand. Can you tell me more about your symptoms?";

        if (text.includes('hello') || text.includes('hi')) {
            reply = "Hello there! I am your AI doctor. How are you feeling today?";
        } else if (text.includes('headache') || text.includes('fever') || text.includes('pain')) {
            reply = "I'm sorry to hear that. For how long have you had these symptoms?";
        } else if (text.includes('medicine') || text.includes('prescription')) {
            reply = "I will send an e-prescription to your portal right away.";
        } else if (text.includes('call') || text.includes('bye') || text.includes('thank')) {
            reply = "You're welcome! Take rest and drink plenty of fluids. Goodbye!";
            setTimeout(() => {
                if (micOn) micBtn.click();
            }, 4000);
        }

        // Display Caption
        if (doctorCaption) {
            doctorCaption.innerText = `"${reply}"`;
            doctorCaption.classList.add('show');
        }

        if (voiceIndicator) {
            voiceIndicator.classList.remove('listening');
            voiceStatus.innerText = "Doctor is speaking...";
        }

        // Speech Synthesis API
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(reply);
            utterance.lang = 'en-US';
            utterance.pitch = 1.1;
            utterance.rate = 1.0;

            const voices = window.speechSynthesis.getVoices();
            const voice = voices.find(v => v.name.includes('Female') || v.name.includes('Google US English'));
            if (voice) utterance.voice = voice;

            utterance.onend = function () {
                if (doctorCaption) {
                    setTimeout(() => doctorCaption.classList.remove('show'), 3000);
                }
                if (micOn && recognition && voiceIndicator) {
                    voiceStatus.innerText = "Tap Mic to speak again";
                }
            };
            window.speechSynthesis.speak(utterance);
        }
    }

    micBtn.addEventListener('click', (e) => {
        e.preventDefault();
        micOn = !micOn;

        if (micOn) {
            micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
            micBtn.style.color = 'white';
            if (recognition) {
                try {
                    recognition.start();
                } catch (e) { console.error(e); }
            } else {
                if (voiceStatus) voiceStatus.innerText = "Speech Recognition not supported.";
            }
        } else {
            micBtn.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
            micBtn.style.color = '#EF4444';
            if (recognition) {
                try { recognition.stop(); } catch (e) { }
                if (voiceIndicator) {
                    voiceIndicator.classList.remove('listening');
                    voiceStatus.innerText = "Mic is muted";
                }
            }
            window.speechSynthesis.cancel();
        }
    });

    camBtn.addEventListener('click', (e) => {
        e.preventDefault();
        camOn = !camOn;
        camBtn.innerHTML = camOn ? '<i class="fa-solid fa-video"></i>' : '<i class="fa-solid fa-video-slash"></i>';
        camBtn.style.color = camOn ? 'white' : '#EF4444';
        if (!camOn) {
            patientCam.style.opacity = '0';
        } else {
            patientCam.style.opacity = '1';
        }
    });

    endBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mainVideo.style.filter = 'grayscale(100%) blur(5px)';
        document.querySelector('.video-controls').style.display = 'none';
        patientCam.style.display = 'none';

        const callEnded = document.createElement('div');
        callEnded.innerText = "Call Ended";
        callEnded.style.position = 'absolute';
        callEnded.style.top = '50%';
        callEnded.style.left = '50%';
        callEnded.style.transform = 'translate(-50%, -50%)';
        callEnded.style.color = 'white';
        callEnded.style.fontSize = '2rem';
        callEnded.style.fontWeight = 'bold';
        callEnded.style.zIndex = '10';

        document.querySelector('.video-ui').appendChild(callEnded);
    });
}

// Login Modal Logic
const loginBtns = document.querySelectorAll('.login-btn');
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');

if (loginModal && closeLogin) {
    loginBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('active');

            // Auto focus email input for better UX
            setTimeout(() => {
                const emailInput = loginModal.querySelector('input[type="email"]');
                if (emailInput) emailInput.focus();
            }, 100);
        });
    });

    closeLogin.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });

    // Close on clicking outside the modal
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });

    // Forgot Password & Request Demo links
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            const emailInput = loginModal.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert(`Password reset instructions have been sent to ${emailInput.value}`);
            } else {
                alert("Please enter your email address first to reset your password.");
                if (emailInput) emailInput.focus();
            }
        });
    }

    const requestDemoLink = document.getElementById('requestDemoLink');
    const demoModal = document.getElementById('demoModal');
    if (requestDemoLink && demoModal) {
        requestDemoLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.remove('active');
            setTimeout(() => {
                demoModal.classList.add('active');
            }, 300);
        });
    }

    // Handle form submission (prevent reload for preview)
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('.login-btn-submit');
            btn.innerText = 'Signing In...';
            btn.style.opacity = '0.8';

            // Redirect to Dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
}

// Video Modal Logic
const watchVideoBtn = document.getElementById('watchVideoBtn');
const videoModal = document.getElementById('videoModal');
const closeVideo = document.getElementById('closeVideo');
const promoVideo = document.getElementById('promoVideo');

if (watchVideoBtn && videoModal && closeVideo && promoVideo) {
    let originalSrc = promoVideo.src;

    watchVideoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        videoModal.classList.add('active');
        // Auto-play the video when modal opens
        if (!originalSrc.includes('autoplay=1')) {
            promoVideo.src = originalSrc + (originalSrc.includes('?') ? '&' : '?') + "autoplay=1";
        }
    });

    const stopVideo = () => {
        promoVideo.src = originalSrc; // Resetting to original src stops the video
    };

    closeVideo.addEventListener('click', () => {
        videoModal.classList.remove('active');
        stopVideo();
    });

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            stopVideo();
        }
    });
}

// Demo Modal Logic
const demoModal = document.getElementById('demoModal');
const closeDemo = document.getElementById('closeDemo');

if (demoModal && closeDemo) {
    const allBtns = document.querySelectorAll('.btn');
    allBtns.forEach(btn => {
        if (btn.innerText.includes('Demo') || btn.innerText.includes('Trial')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                demoModal.classList.add('active');
            });
        }
    });

    closeDemo.addEventListener('click', () => {
        demoModal.classList.remove('active');
    });

    demoModal.addEventListener('click', (e) => {
        if (e.target === demoModal) {
            demoModal.classList.remove('active');
        }
    });

    const demoForm = document.getElementById('demoForm');
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = demoForm.querySelector('.login-btn-submit');
            const originalText = btn.innerText;
            btn.innerText = 'Requesting...';
            btn.style.opacity = '0.8';

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.opacity = '1';
                demoModal.classList.remove('active');

                // Show a clear success alert
                alert("Success! Your demo request has been received. Our sales team will email you shortly to schedule the session.");

                // Reset the form
                demoForm.reset();
            }, 1500);
        });
    }
}

// Module Modal Logic
const moduleModal = document.getElementById('moduleModal');
const closeModule = document.getElementById('closeModule');
const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
const modulePanes = document.querySelectorAll('.module-pane');

if (moduleModal && closeModule) {
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const moduleId = btn.getAttribute('data-module');

            // Hide all panes
            modulePanes.forEach(pane => {
                pane.style.display = 'none';
            });

            // Show the specific pane
            const activePane = document.getElementById('pane-' + moduleId);
            if (activePane) {
                activePane.style.display = 'block';
            }

            // Open modal
            moduleModal.classList.add('active');
        });
    });

    closeModule.addEventListener('click', () => {
        moduleModal.classList.remove('active');
    });

    moduleModal.addEventListener('click', (e) => {
        if (e.target === moduleModal) {
            moduleModal.classList.remove('active');
        }
    });
}

// Blog Modal Logic
const viewAllPostsBtn = document.getElementById('viewAllPostsBtn');
const blogModal = document.getElementById('blogModal');
const closeBlog = document.getElementById('closeBlog');

if (viewAllPostsBtn && blogModal && closeBlog) {
    viewAllPostsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        blogModal.classList.add('active');
    });

    closeBlog.addEventListener('click', () => {
        blogModal.classList.remove('active');
    });

    blogModal.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            blogModal.classList.remove('active');
        }
    });
}

// Article Reader Modal Logic
const articleModal = document.getElementById('articleModal');
const closeArticle = document.getElementById('closeArticle');
const readMoreBtns = document.querySelectorAll('.read-more');

if (articleModal && closeArticle) {
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Find parent card to extract specific article info dynamically
            const card = btn.closest('.blog-card');
            if (card) {
                const imgResult = card.querySelector('img').src;
                const titleResult = card.querySelector('h4').innerText;
                const tagResult = card.querySelector('.tag').innerText;
                const excerptResult = card.querySelector('p').innerText;

                document.getElementById('articleImage').src = imgResult;
                document.getElementById('articleTitle').innerText = titleResult;
                document.getElementById('articleTag').innerText = tagResult;
                document.getElementById('articleExcerpt').innerText = excerptResult;
            }

            articleModal.classList.add('active');
        });
    });

    closeArticle.addEventListener('click', () => {
        articleModal.classList.remove('active');
    });

    articleModal.addEventListener('click', (e) => {
        if (e.target === articleModal) {
            articleModal.classList.remove('active');
        }
    });
}

// Mobile Hamburger Menu Logic
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const mobLinks = document.querySelectorAll('.mob-link');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    mobLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Share Article Native Logic
const shareArticleBtn = document.getElementById('shareArticleBtn');
if (shareArticleBtn) {
    shareArticleBtn.addEventListener('click', async () => {
        const title = document.getElementById('articleTitle').innerText;
        const text = document.getElementById('articleExcerpt').innerText;
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: url
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(url).then(() => {
                alert("Article link copied to clipboard!");
            }).catch(err => {
                alert("Failed to copy link.");
            });
        }
    });
}

// Telemedicine Fullscreen Logic
const exploreTeleBtn = document.getElementById('exploreTeleBtn');
const teleVideoUI = document.getElementById('teleVideoUI');
const exitTeleBtn = document.getElementById('exitTeleBtn');

if (exploreTeleBtn && teleVideoUI && exitTeleBtn) {
    exploreTeleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        teleVideoUI.classList.add('fullscreen');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    exitTeleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        teleVideoUI.classList.remove('fullscreen');
        document.body.style.overflow = ''; // Restore background scrolling
    });
}
