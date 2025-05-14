// Sample data structure with Font Awesome icons
const siteData = {
	categories: [
		{
			name: "Android",
			// Each icon has iconType (fa-brands, fa-solid, etc) and iconName properties
			icon: {
				iconType: "fa-brands",
				iconName: "fa-android"
			},
			subcategories: [
				{
					name: "Mods",
					items: [
						{
							title: "Spotify Premium",
							description: "Spotify with Premium Unlocked ",
							image: "https://primordialradio.com/wp-content/uploads/2024/04/Link_Image_Spotify.jpg",
							link: "https://github.com/soudblox/nichdant-revanced/releases/download/1/spotify-revanced-v9.0.42.529-all.apk"
						}
					]
				}
			]
		},
		{
			name: "Windows",
			icon: {
				iconType: "fa-brands",
				iconName: "fa-windows"
			},
			subcategories: [
				{
					name: "Apps",
					items: [
						{
							title: "PowerToys",
							description: "Set of utilities for power users to tune Windows for greater productivity.",
							image: "/api/placeholder/400/320",
							link: "#powertoys"
						},
						{
							title: "ShareX",
							description: "Free and open source screen capture and file sharing tool.",
							image: "/api/placeholder/400/320",
							link: "#sharex"
						},
						{
							title: "Everything",
							description: "Locate files and folders by name instantly.",
							image: "/api/placeholder/400/320",
							link: "#everything"
						}
					]
				},
				{
					name: "Mods",
					items: [
						{
							title: "StartAllBack",
							description: "Brings back the classic Start Menu to Windows 11.",
							image: "/api/placeholder/400/320",
							link: "#startallback"
						},
						{
							title: "TranslucentTB",
							description: "Utility that makes the Windows taskbar translucent/transparent.",
							image: "/api/placeholder/400/320",
							link: "#translucenttb"
						}
					]
				}
			]
		},
		{
			name: "Websites",
			icon: {
				iconType: "fa-solid",
				iconName: "fa-globe"
			},
			subcategories: [
				{
					name: "All",
					items: [
						{
							title: "Ninite",
							description: "Install and update multiple apps at once without toolbars.",
							image: "/api/placeholder/400/320",
							link: "#ninite"
						},
						{
							title: "Photopea",
							description: "Free online photo editor similar to Photoshop.",
							image: "/api/placeholder/400/320",
							link: "#photopea"
						},
						{
							title: "PrivacyTools",
							description: "Services, tools and knowledge to protect your privacy against surveillance.",
							image: "/api/placeholder/400/320",
							link: "#privacytools"
						}
					]
				}
			]
		},
		{
			name: "Extensions",
			icon: {
				iconType: "fa-solid",
				iconName: "fa-puzzle-piece"
			},
			subcategories: [
				{
					name: "All",
					items: [
						{
							title: "uBlock Origin",
							description: "Efficient blocker for browsers. Fast and lean.",
							image: "/api/placeholder/400/320",
							link: "#ublock"
						},
						{
							title: "Dark Reader",
							description: "Dark mode for every website. Care for your eyes, use dark theme for night and daily browsing.",
							image: "/api/placeholder/400/320",
							link: "#darkreader"
						},
						{
							title: "Bitwarden",
							description: "Free and open source password manager with built-in sync across all your devices.",
							image: "/api/placeholder/400/320",
							link: "#bitwarden"
						}
					]
				}
			]
		},
		{
			name: "Userscripts",
			icon: {
				iconType: "fa-solid",
				iconName: "fa-code"
			},
			subcategories: [
				{
					name: "All",
					items: [
						{
							title: "YouTube Auto HD",
							description: "Automatically sets YouTube quality to highest available.",
							image: "/api/placeholder/400/320",
							link: "#youtubehd"
						},
						{
							title: "Reddit Enhancement Suite",
							description: "Suite of modules that enhance your Reddit browsing experience.",
							image: "/api/placeholder/400/320",
							link: "#res"
						},
						{
							title: "Anti-Adblock Killer",
							description: "Helps you keep your Ad-Blocker active when you visit a website with an Anti-Adblock script.",
							image: "/api/placeholder/400/320",
							link: "#antiadblock"
						}
					]
				}
			]
		}
	]
};

// Main application namespace
const NichdantApp = {
	// Core functionality
	init() {
		// Check for deep link before initializing
		const deepLinkParams = this.urlUtils.getUrlParams();
		
		// Load categories and setup the app
		this.loadCategories();
		this.effects.initParticles();
		this.setupEventListeners();
		
		// Handle deep linking if parameters exist
		if (deepLinkParams.card) {
			this.urlUtils.handleDeepLink(deepLinkParams);
		}
		// The rest will happen after the initial content is loaded
	},
	
	// URL utilities for handling deep links
	urlUtils: {
		// Parse URL parameters
		getUrlParams() {
			const params = {};
			const queryString = window.location.search;
			
			if (queryString) {
				const urlParams = new URLSearchParams(queryString);
				urlParams.forEach((value, key) => {
					params[key] = value;
				});
			}
			
			return params;
		},
		
		// Create a shareable URL for a specific card
		createShareableUrl(categoryIndex, subcategoryIndex, itemTitle) {
			const url = new URL(window.location.href.split('?')[0]);
			url.searchParams.append('category', categoryIndex);
			url.searchParams.append('subcategory', subcategoryIndex);
			url.searchParams.append('card', encodeURIComponent(itemTitle));
			return url.toString();
		},
				// Handle deep linking to a specific card
		handleDeepLink(params) {
			const categoryIndex = params.category;
			const subcategoryIndex = params.subcategory;
			const cardTitle = params.card ? decodeURIComponent(params.card) : null;
			
			if (categoryIndex !== undefined && subcategoryIndex !== undefined) {
				// First select the proper category and subcategory
				NichdantApp.navigation.selectCategory(categoryIndex);
				NichdantApp.navigation.selectSubcategory(categoryIndex, subcategoryIndex);
				
				// If we have a card title, find and highlight it
				if (cardTitle) {
					setTimeout(() => {
						const cardElement = document.querySelector(`.card[data-title="${cardTitle}"]`);
						if (cardElement) {
							// Highlight the card
							cardElement.classList.add('highlighted-card');
							
							// Scroll to the card
							cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });							// Remove highlight after animation
							setTimeout(() => {
								cardElement.classList.remove('highlighted-card');
							}, 4700);
						}
					}, 500); // Wait for content to load
				}
			}
		},
		
		// Copy a URL to clipboard and show feedback
		copyToClipboard(text) {
			navigator.clipboard.writeText(text).then(() => {
				// Show feedback toast
				showToast('Link copied to clipboard!');
			}).catch(err => {
				console.error('Failed to copy: ', err);
				showToast('Failed to copy link');
			});
		}
	},
	
	setupEventListeners() {
		// FAB button functionality
		const fab = document.getElementById('floating-action-btn');
		fab.addEventListener('click', function () {
			this.classList.toggle('active');
		});

		// Handle FAB options
		document.querySelectorAll('.fab-option').forEach(option => {
			option.addEventListener('click', e => {
				e.stopPropagation();
				const action = option.dataset.action;

				if (action === 'theme') {
					// Fix theme toggle to properly switch between light and dark
					document.body.classList.toggle('light-theme');
					document.documentElement.classList.toggle('light-theme');
				} else if (action === 'random') {
					this.features.showRandomTip();
				}

				fab.classList.remove('active');
			});
		});

		// Event listener for search input
		const searchInput = document.getElementById('search-input');
		searchInput.addEventListener('input', e => {
			if (searchInput.value.trim() === '') {
				// If search is cleared, reset to current category view
				const activeCategory = document.querySelector('.category-button.active');
				// Make sure the subcategory nav is visible when clearing search
				const subcategoryNav = document.getElementById('subcategory-nav');
				subcategoryNav.style.display = 'flex';

				if (activeCategory) {
					this.navigation.selectCategory(activeCategory.dataset.index);
				}
			} else {
				// Debounce search for better performance
				clearTimeout(searchInput.searchTimeout);
				searchInput.searchTimeout = setTimeout(() => {
					this.search.handleSearch();
				}, 300);
			}
		});

		// Handle form submission to prevent page reload
		const searchContainer = document.querySelector('.search-container');
		if (searchContainer) {
			searchContainer.addEventListener('submit', e => {
				e.preventDefault();
				this.search.handleSearch();
			});
		}

		// Handle category navigation arrows
		this.setupNavArrows();

		// Handle window resize events
		window.addEventListener('resize', () => this.handleResize());

		// Set up interactive element effect
		document.addEventListener('mousemove', e => this.effects.handleMousemoveEffect(e));
	},

	setupNavArrows() {
		const categoryNav = document.getElementById('category-nav');
		const navLeft = document.querySelector('.nav-left');
		const navRight = document.querySelector('.nav-right');

		if (navLeft && navRight && categoryNav) {
			navLeft.addEventListener('click', () => {
				categoryNav.scrollBy({ left: -200, behavior: 'smooth' });
			});

			navRight.addEventListener('click', () => {
				categoryNav.scrollBy({ left: 200, behavior: 'smooth' });
			});

			// Show/hide arrows based on scroll position
			categoryNav.addEventListener('scroll', () => {
				navLeft.style.opacity = categoryNav.scrollLeft <= 10 ? '0.3' : '1';
				navLeft.style.pointerEvents = categoryNav.scrollLeft <= 10 ? 'none' : 'all';

				const isAtEnd = categoryNav.scrollLeft + categoryNav.clientWidth >= categoryNav.scrollWidth - 10;
				navRight.style.opacity = isAtEnd ? '0.3' : '1';
				navRight.style.pointerEvents = isAtEnd ? 'none' : 'all';
			});

			// Trigger scroll event to set initial arrow states
			categoryNav.dispatchEvent(new Event('scroll'));
		}
	},

	handleResize() {
		const isMobile = window.innerWidth <= 768;

		// Check if a category is active and update mobile/desktop displays
		const activeCategory = document.querySelector('.category-button.active');
		if (activeCategory) {
			const categoryIndex = activeCategory.dataset.index;

			// Update mobile dropdown label
			const mobileDropdownLabel = document.querySelector('.mobile-dropdown-button .dropdown-label');
			if (mobileDropdownLabel && categoryIndex) {
				mobileDropdownLabel.textContent = siteData.categories[categoryIndex].name;
			}

			// Check if the current category is Userscripts and update banner as needed
			if (siteData.categories[categoryIndex]?.name === "Userscripts") {
				const activeSubcategory = document.querySelector('.subcategory-button.active');
				if (activeSubcategory) {
					// Reload the content with the appropriate banner type based on current screen size
					this.content.loadContent(categoryIndex, activeSubcategory.dataset.subcategoryIndex);
				}
			}

			// Reload categories to update tooltips for current view size
			if (this._lastWindowWidth &&
				((this._lastWindowWidth <= 768 && isMobile === false) ||
					(this._lastWindowWidth > 768 && isMobile === true))) {
				this.loadCategories();
				this.navigation.selectCategory(categoryIndex);
			}
		}

		// Store current window width for comparison on next resize
		this._lastWindowWidth = window.innerWidth;

		// Close mobile dropdown if screen size changes to desktop
		if (!isMobile) {
			const dropdown = document.getElementById('mobile-category-dropdown');
			const content = document.getElementById('mobile-dropdown-content');

			if (dropdown) dropdown.classList.remove('active');
			if (content) content.classList.remove('active');
		}
	},

	// Load categories with simplified dropdown handling
	loadCategories() {
		const categoryNav = document.getElementById('category-nav');
		const mobileDropdownContent = document.getElementById('mobile-dropdown-content');
		const mobileDropdownLabel = document.querySelector('.mobile-dropdown-button .dropdown-label');
		const isMobile = window.innerWidth <= 768;

		// Clear existing content
		categoryNav.innerHTML = '';
		mobileDropdownContent.innerHTML = '';

		siteData.categories.forEach((category, index) => {
			// Create desktop category button
			const button = document.createElement('button');
			button.className = 'category-button';

			button.innerHTML = `<span class="category-icon"><i class="${category.icon.iconType} ${category.icon.iconName}"></i></span> ${category.name}`;

			button.dataset.index = index;

			button.addEventListener('click', () => {
				this.navigation.selectCategory(index);
			});

			categoryNav.appendChild(button);

			// Create simplified mobile category button
			const mobileButton = document.createElement('button');
			mobileButton.className = 'category-button';
			mobileButton.innerHTML = `<span class="category-icon"><i class="${category.icon.iconType} ${category.icon.iconName}"></i></span> ${category.name}`;
			mobileButton.dataset.index = index;

			// Simple click handler for mobile dropdown items
			mobileButton.addEventListener('click', e => {
				e.preventDefault();  // Prevent default behavior
				e.stopPropagation(); // Prevent event bubbling

				// Select the category
				this.navigation.selectCategory(index);

				// Update dropdown label
				mobileDropdownLabel.textContent = category.name;

				// Close dropdown directly
				const mobileDropdown = document.getElementById('mobile-category-dropdown');
				const mobileDropdownContent = document.getElementById('mobile-dropdown-content');

				mobileDropdown.classList.remove('active');
				mobileDropdownContent.classList.remove('active');
			});

			mobileDropdownContent.appendChild(mobileButton);
		});

		// Set up mobile dropdown toggle
		this.setupMobileDropdown();

		// Select first category and hide preloader only when content is ready
		this.navigation.selectCategory(0, true);

		// Set initial dropdown label
		if (siteData.categories.length > 0) {
			mobileDropdownLabel.textContent = siteData.categories[0].name;
		}
	},

	setupMobileDropdown() {
		const mobileDropdown = document.getElementById('mobile-category-dropdown');

		// Remove any existing listeners to avoid duplicates
		const clone = mobileDropdown.cloneNode(true);
		mobileDropdown.parentNode.replaceChild(clone, mobileDropdown);

		// Add simplified toggle handler
		clone.addEventListener('click', this.mobile.handleDropdownToggle);

		// Close dropdown when clicking outside
		document.addEventListener('click', e => {
			const dropdown = document.getElementById('mobile-category-dropdown');
			const content = document.getElementById('mobile-dropdown-content');

			// Check if click is outside dropdown area
			if (dropdown && !dropdown.contains(e.target) &&
				content && !content.contains(e.target)) {

				dropdown.classList.remove('active');
				content.classList.remove('active');
			}
		});
	},

	// Navigation module
	navigation: {
		// Function to select category
		selectCategory(index, isInitialLoad = false) {
			// Update active category button
			const categoryButtons = document.querySelectorAll('.category-button');
			categoryButtons.forEach((btn, i) => {
				btn.classList.toggle('active', i === parseInt(index));
			});

			// Update mobile dropdown label
			const mobileDropdownLabel = document.querySelector('.mobile-dropdown-button .dropdown-label');
			if (mobileDropdownLabel) {
				mobileDropdownLabel.textContent = siteData.categories[index].name;
			}

			// Ensure subcategory navigation is visible
			const subcategoryNav = document.getElementById('subcategory-nav');
			subcategoryNav.style.display = 'flex';

			// Load subcategories for selected category
			this.loadSubcategories(index, isInitialLoad);

			// Handle mobile userscript tip display
			const mobileUserscriptTip = document.getElementById('mobile-userscript-tip');
			if (mobileUserscriptTip) {
				const isMobile = window.innerWidth <= 768;
				const isUserscriptsCategory = siteData.categories[index]?.name === "Userscripts";

				mobileUserscriptTip.style.display = (isMobile && isUserscriptsCategory) ? 'flex' : 'none';
			}
		},

		// Function to load subcategories
		loadSubcategories(categoryIndex, isInitialLoad = false) {
			const subcategoryNav = document.getElementById('subcategory-nav');
			subcategoryNav.innerHTML = '';

			const category = siteData.categories[categoryIndex];

			category.subcategories.forEach((subcategory, index) => {
				const button = document.createElement('button');
				button.className = 'subcategory-button';
				button.textContent = subcategory.name;
				button.dataset.categoryIndex = categoryIndex;
				button.dataset.subcategoryIndex = index;

				button.addEventListener('click', () => {
					this.selectSubcategory(categoryIndex, index, isInitialLoad);
				});

				subcategoryNav.appendChild(button);
			});

			// Select first subcategory by default
			this.selectSubcategory(categoryIndex, 0, isInitialLoad);
		},

		// Function to select subcategory
		selectSubcategory(categoryIndex, subcategoryIndex, isInitialLoad = false) {
			// Update active subcategory button
			const subcategoryButtons = document.querySelectorAll('.subcategory-button');
			subcategoryButtons.forEach((btn) => {
				const isActive = btn.dataset.categoryIndex === categoryIndex.toString() &&
					btn.dataset.subcategoryIndex === subcategoryIndex.toString();
				btn.classList.toggle('active', isActive);
			});

			// Load content for selected subcategory
			NichdantApp.content.loadContent(categoryIndex, subcategoryIndex, isInitialLoad);
		}
	},

	// Content module
	content: {
		// Function to load content
		loadContent(categoryIndex, subcategoryIndex, isInitialLoad = false) {
			const contentContainer = document.getElementById('content-container');
			contentContainer.innerHTML = '';

			// Show ghost cards while loading
			this.showGhostCards();

			setTimeout(() => {
				const category = siteData.categories[categoryIndex];
				const subcategory = category.subcategories[subcategoryIndex];
				const isMobile = window.innerWidth <= 768;

				contentContainer.innerHTML = '';				const contentSection = document.createElement('div');
				contentSection.className = 'content-section active';
				
				// Add a class if there's only one card to center it
				if (subcategory.items.length === 1) {
					contentSection.classList.add('single-card');
				}

				// Handle userscript tips for both mobile and desktop
				if (category.name === "Userscripts") {
					// Create userscript tips based on device type
					if (isMobile) {
						contentSection.appendChild(this.createMobileUserscriptBanner());
					} else {
						contentSection.appendChild(this.createDesktopUserscriptBanner());
					}
				}				subcategory.items.forEach(item => {
					const card = this.createCard(item, categoryIndex, subcategoryIndex);
					contentSection.appendChild(card);
				});

				contentContainer.appendChild(contentSection);

				// If this is the initial app load, hide preloader and show content
				if (isInitialLoad) {
					setTimeout(() => {
						// Hide preloader with animation
						const preloader = document.querySelector('.preloader');
						preloader.classList.add('hidden');
						
						// Show content with animation once preloader starts fading
						setTimeout(() => {
							document.querySelector('.container').classList.add('visible');
						}, 300);
					}, 200); // Small additional delay to ensure all DOM elements are rendered
				}
			}, 300);
		},

		// Create desktop version of userscript banner
		createDesktopUserscriptBanner() {
			const noticeBanner = document.createElement('div');
			noticeBanner.className = 'notice-banner';
			noticeBanner.innerHTML = `
                <div class="notice-icon"><i class="fa-solid fa-circle-info"></i></div>
                <div class="notice-content">
                    <h3>What are Userscripts?</h3>
                    <p>Userscripts are small JavaScript programs that modify websites. To use them, you need to install a userscript manager extension first:</p>
                    <ul>
                        <li>
                            <a href="https://violentmonkey.github.io/" target="_blank"><i class="fa-solid fa-puzzle-piece"></i> Violentmonkey</a> <span class="recommendation-badge">Recommended</span>
                        </li>
                        <li><a href="https://www.tampermonkey.net/" target="_blank"><i class="fa-solid fa-puzzle-piece"></i> Tampermonkey</a></li>
                        <li><a href="https://www.greasespot.net/" target="_blank"><i class="fa-solid fa-puzzle-piece"></i> Greasemonkey</a></li>
                    </ul>
                </div>
            `;
			return noticeBanner;
		},

		// Create mobile version of userscript banner
		createMobileUserscriptBanner() {
			const mobileTip = document.createElement('div');
			mobileTip.className = 'mobile-userscript-tip';
			mobileTip.innerHTML = `
                <h3><i class="fa-solid fa-circle-info"></i> Using Userscripts</h3>
                <p>Userscripts require a browser extension to run. Install one of these managers:</p>
                <div class="script-managers">
                    <a href="https://violentmonkey.github.io/" target="_blank" class="manager-button recommended">
                        <i class="fa-solid fa-puzzle-piece"></i> Violentmonkey
                    </a>
                    <a href="https://www.tampermonkey.net/" target="_blank" class="manager-button">
                        <i class="fa-solid fa-puzzle-piece"></i> Tampermonkey
                    </a>
                    <a href="https://www.greasespot.net/" target="_blank" class="manager-button">
                        <i class="fa-solid fa-puzzle-piece"></i> Greasemonkey
                    </a>
                </div>
            `;
			return mobileTip;
		},

		createCard(item, categoryIndex, subcategoryIndex) {
			const card = document.createElement('div');
			card.className = 'card';
			card.dataset.title = item.title; // Add title as data attribute for easy identification
			
			// Generate a shareable URL for this card
			const shareUrl = NichdantApp.urlUtils.createShareableUrl(categoryIndex, subcategoryIndex, item.title);

			card.innerHTML = `
                <div class="card-image" style="background-image: url('${item.image}')"></div>
                <div class="card-body">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-text">${item.description}</p>
                    <div class="card-actions">
                        <a href="${item.link}" class="card-link">
                            Check it out
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                        <button class="share-btn" title="Share this card">
                            <i class="fa-solid fa-share-nodes"></i>
                        </button>
                    </div>
                </div>
            `;

            // Add click event for share button
            const shareBtn = card.querySelector('.share-btn');
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                NichdantApp.urlUtils.copyToClipboard(shareUrl);
            });

			return card;
		},

		// Function to show ghost cards while loading
		showGhostCards() {
			const contentContainer = document.getElementById('content-container');
			const contentSection = document.createElement('div');
			contentSection.className = 'content-section active';

			for (let i = 0; i < 6; i++) {
				const ghostCard = document.createElement('div');
				ghostCard.className = 'ghost-card';
				ghostCard.innerHTML = `
                    <div class="ghost-image"></div>
                    <div class="ghost-body">
                        <div class="ghost-title"></div>
                        <div class="ghost-text"></div>
                        <div class="ghost-text"></div>
                        <div class="ghost-text"></div>
                    </div>
                `;
				contentSection.appendChild(ghostCard);
			}

			contentContainer.appendChild(contentSection);
		}
	},

	// Search module
	search: {
		// Function to handle search
		handleSearch() {
			const searchInput = document.getElementById('search-input');
			const searchTerm = searchInput.value.toLowerCase().trim();
			const subcategoryNav = document.getElementById('subcategory-nav');

			if (!searchTerm) {
				// If search is empty, just show the current category/subcategory
				const activeCategory = document.querySelector('.category-button.active');
				const activeSubcategory = document.querySelector('.subcategory-button.active');

				// Show subcategory navigation
				subcategoryNav.style.display = 'flex';

				if (activeCategory && activeSubcategory) {
					NichdantApp.navigation.selectSubcategory(
						activeCategory.dataset.index,
						activeSubcategory.dataset.subcategoryIndex
					);
				}
				return;
			}

			// Hide subcategory navigation during search results
			subcategoryNav.style.display = 'none';

			const contentContainer = document.getElementById('content-container');
			contentContainer.innerHTML = '';

			// Show ghost cards while "searching"
			NichdantApp.content.showGhostCards();

			setTimeout(() => {
				contentContainer.innerHTML = '';
				const contentSection = document.createElement('div');
				contentSection.className = 'content-section active';

				// Search through all items in all categories and subcategories
				const results = this.findMatchingItems(searchTerm);

				if (results.length > 0) {
					// Add search results header
					const searchHeader = document.createElement('div');
					searchHeader.className = 'search-results-header';
					searchHeader.innerHTML = `<h2>Search results for "${searchTerm}"</h2>`;
					contentSection.appendChild(searchHeader);

					results.forEach(result => {
						contentSection.appendChild(
							this.createSearchResultCard(result.item, result.category)
						);
					});
				} else {
					contentSection.appendChild(this.createNoResultsMessage(searchTerm));
				}

				contentContainer.appendChild(contentSection);
			}, 300);
		},

		findMatchingItems(searchTerm) {
			const results = [];

			siteData.categories.forEach(category => {
				category.subcategories.forEach(subcategory => {
					subcategory.items.forEach(item => {
						if (
							item.title.toLowerCase().includes(searchTerm) ||
							item.description.toLowerCase().includes(searchTerm)
						) {
							results.push({ item, category });
						}
					});
				});
			});

			return results;
		},

		createSearchResultCard(item, category) {
			const card = document.createElement('div');
			card.className = 'card';
			card.dataset.title = item.title;
			
			// Find the category and subcategory indices
			let categoryIndex = -1;
			let subcategoryIndex = -1;
			
			// Find the indices for this item
			siteData.categories.forEach((cat, catIndex) => {
				if (cat.name === category.name) {
					categoryIndex = catIndex;
					cat.subcategories.forEach((subcat, subcatIndex) => {
						subcat.items.forEach((cardItem) => {
							if (cardItem.title === item.title) {
								subcategoryIndex = subcatIndex;
							}
						});
					});
				}
			});
			
			// Generate a shareable URL for this card if indices were found
			const shareUrl = (categoryIndex !== -1 && subcategoryIndex !== -1) 
				? NichdantApp.urlUtils.createShareableUrl(categoryIndex, subcategoryIndex, item.title)
				: null;

			card.innerHTML = `
                <div class="card-image" style="background-image: url('${item.image}')"></div>
                <div class="card-body">
                    <h3 class="card-title">
                        <i class="${category.icon.iconType} ${category.icon.iconName}"></i> ${item.title}
                    </h3>
                    <p class="card-text">${item.description}</p>
                    <div class="card-actions">
                        <a href="${item.link}" class="card-link">
                            Check it out
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                        ${shareUrl ? `
                        <button class="share-btn" title="Share this card">
                            <i class="fa-solid fa-share-nodes"></i>
                        </button>
                        ` : ''}
                    </div>
                </div>
            `;
			
			// Add click event for share button if available
			const shareBtn = card.querySelector('.share-btn');
			if (shareBtn && shareUrl) {
				shareBtn.addEventListener('click', (e) => {
					e.preventDefault();
					NichdantApp.urlUtils.copyToClipboard(shareUrl);
				});
			}

			return card;
		},

		createNoResultsMessage(searchTerm) {
			const noResults = document.createElement('div');
			noResults.className = 'no-results';
			noResults.innerHTML = `
                <div class="no-results-content">
                    <div class="search-icon-container">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <i class="fa-solid fa-question animated-question"></i>
                    </div>
                    <h3>Oops! No matches found</h3>
                    <p>We couldn't find any items matching "<span class="highlight-search-term">${searchTerm}</span>"</p>
                </div>
            `;
			return noResults;
		}
	},

	// Mobile specific functionality
	mobile: {
		// Mobile dropdown toggle handler
		handleDropdownToggle(e) {
			if (e) e.stopPropagation();

			// Simply toggle active class on dropdown and content
			const mobileDropdown = document.getElementById('mobile-category-dropdown');
			const mobileDropdownContent = document.getElementById('mobile-dropdown-content');

			mobileDropdown.classList.toggle('active');
			mobileDropdownContent.classList.toggle('active');
		}
	},

	// Visual effects
	effects: {
		// Refined particles function
		initParticles() {
			const container = document.getElementById('particles-container');
			container.innerHTML = ''; // Clear existing particles

			const particleCount = window.innerWidth > 768 ? 40 : 20; // Reduced count

			for (let i = 0; i < particleCount; i++) {
				const size = Math.random() * 4 + 2; // Smaller particles
				const x = Math.random() * 100;
				const y = Math.random() * 100;
				const duration = Math.random() * 60 + 40; // Slower movement
				const delay = Math.random() * 10;

				const particle = document.createElement('div');
				particle.className = 'particle';
				particle.style.width = `${size}px`;
				particle.style.height = `${size}px`;
				particle.style.left = `${x}vw`;
				particle.style.top = `${y}vh`;
				particle.style.opacity = Math.random() * 0.3 + 0.1; // Lower opacity

				// Add the floating animation
				particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
				container.appendChild(particle);
			}
		},

		// Mousemove effect for interactive elements
		handleMousemoveEffect(e) {
			const cursorX = e.clientX;
			const cursorY = e.clientY;
			const proximity = 150; // Increased from 100 to make effect start from further away

			// Elements to apply the effect to
			const elements = document.querySelectorAll('.category-button, .subcategory-button, .card-link, .card, .search-container');

			elements.forEach(element => {
				const rect = element.getBoundingClientRect();
				const elementCenterX = rect.left + rect.width / 2;
				const elementCenterY = rect.top + rect.height / 2;

				// Calculate distance between cursor and element center
				const deltaX = cursorX - elementCenterX;
				const deltaY = cursorY - elementCenterY;
				const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

				// Calculate a threshold based on element size
				const threshold = proximity + Math.max(rect.width, rect.height) / 1.5; // More sensitive detection

				if (distance < threshold) {
					// Calculate cursor position relative to element
					const x = ((cursorX - rect.left) / rect.width) * 100;
					const y = ((cursorY - rect.top) / rect.height) * 100;

					// Set coordinates for gradient
					element.style.setProperty('--x', `${x}%`);
					element.style.setProperty('--y', `${y}%`);

					// Calculate intensity with a non-linear curve for smoother falloff
					// This creates a more dramatic effect when very close, but still visible from further
					const normalizedDistance = distance / threshold;
					const intensity = Math.pow(1 - normalizedDistance, 1.5); // Exponential falloff

					element.style.setProperty('--intensity', intensity);
					element.classList.add('highlight-proximity');
				} else {
					// Remove highlight class when cursor is far away
					element.classList.remove('highlight-proximity');
					element.style.setProperty('--intensity', '0');
				}
			});
		}
	},

	// Special features
	features: {
		showRandomTip() {
			const allItems = [];

			siteData.categories.forEach(category => {
				category.subcategories.forEach(subcategory => {
					subcategory.items.forEach(item => {
						allItems.push({ item, category });
					});
				});
			});

			if (allItems.length) {
				const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
				this.createTipModal(randomItem);
			}
		},

		createTipModal(randomItem) {
			const modal = document.createElement('div');
			modal.className = 'random-tip-modal';
			modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                    <h2><i class="${randomItem.category.icon.iconType} ${randomItem.category.icon.iconName}"></i> Random Nichdant</h2>
                    <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                    <div class="card-image" style="background-image: url('${randomItem.item.image}')"></div>
                    <h3>${randomItem.item.title}</h3>
                    <p>${randomItem.item.description}</p>
                    <a href="${randomItem.item.link}" class="card-link">Check it out</a>
                    </div>
                </div>
            `;

			document.body.appendChild(modal);

			setTimeout(() => {
				modal.classList.add('active');
			}, 10);

			this.setupModalListeners(modal);
		},

		setupModalListeners(modal) {
			// Close modal functionality with smooth animation
			const closeModal = () => {
				modal.classList.add('closing');
				modal.classList.remove('active');

				setTimeout(() => {
					modal.remove();
				}, 300); // Match this timeout with the CSS transition duration
			};

			// Close when X button is clicked
			modal.querySelector('.modal-close').addEventListener('click', (e) => {
				e.stopPropagation();
				closeModal();
			});

			// Close when clicking outside the modal content
			modal.addEventListener('click', (e) => {
				if (e.target === modal) {
					closeModal();
				}
			});

			// Close when pressing Escape key
			const escKeyClose = (e) => {
				if (e.key === 'Escape') {
					closeModal();
					document.removeEventListener('keydown', escKeyClose);
				}
			};
			document.addEventListener('keydown', escKeyClose);
		}
	}
};

// Performance optimizations
document.addEventListener('DOMContentLoaded', function () {
	// Detect mobile devices
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	// Performance mode settings
	let lowPerfMode = localStorage.getItem('lowPerfMode') === 'true' || false;

	// Initialize particles with appropriate settings
	initParticles(isMobile || lowPerfMode);

	// Handle performance mode toggle
	document.querySelector('.fab-option[data-action="performance"]').addEventListener('click', function () {
		lowPerfMode = !lowPerfMode;
		localStorage.setItem('lowPerfMode', lowPerfMode);

		// Update UI to indicate performance mode
		this.querySelector('i').className = lowPerfMode ?
			'fa-solid fa-gauge-simple' : 'fa-solid fa-gauge-high';

		// Reinitialize particles with new setting
		document.getElementById('particles-container').innerHTML = '';
		initParticles(isMobile || lowPerfMode);

		// Show feedback toast
		showToast(lowPerfMode ? 'Low performance mode enabled' : 'High performance mode enabled');
	});
});

// Function to initialize particles
function initParticles(reducedMode) {
	// If you're using a particle library, configure it here
	// Example (adjust according to your actual particles implementation):
	if (window.particlesJS) {
		particlesJS('particles-container', {
			particles: {
				number: {
					value: reducedMode ? 20 : 80
				},
				size: {
					value: reducedMode ? 3 : 5
				},
				// Other particle settings with conditional values based on reducedMode
			}
		});
	}
}

// Simple toast notification function
function showToast(message) {
	const toast = document.createElement('div');
	toast.className = 'toast';
	toast.textContent = message;
	document.body.appendChild(toast);

	setTimeout(() => {
		toast.classList.add('show');
		setTimeout(() => {
			toast.classList.remove('show');
			setTimeout(() => {
				document.body.removeChild(toast);
			}, 300);
		}, 2000);
	}, 10);
}

// Initialize application on DOM content loaded
document.addEventListener('DOMContentLoaded', () => NichdantApp.init());