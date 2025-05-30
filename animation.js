// GSAP is loaded via CDN - available as global variables

// Debug flag
const DEBUG = false;

function getTransformProps(animation) {
  if (DEBUG) console.log(`Getting transform props for animation: ${animation}`);
  const transformProps = {};
  switch (animation) {
    case 'fade-up':
      transformProps.y = 20;
      break;
    case 'fade-down':
      transformProps.y = -20;
      break;
    case 'fade-right':
      transformProps.x = -20;
      break;
    case 'fade-left':
      transformProps.x = 20;
      break;
    case 'scale-up':
      transformProps.scale = 0.8;
      transformProps.y = 20;
      break;
    case 'scale-in':
      transformProps.scale = 0.8;
      break;
    case 'skew':
      transformProps.skewX = 10;
      break;
    default:
      // Add default case for unknown animations
      if (DEBUG) console.warn(`Unknown animation type: ${animation}`);
      break;
  }
  if (DEBUG) console.log('Transform props:', transformProps);
  return transformProps;
}

// Check if SplitText is available
function isSplitTextAvailable() {
  return typeof SplitText !== 'undefined';
}

// Check for reduced motion preference
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Initialize animations based on data attributes
document.addEventListener('DOMContentLoaded', () => {
  if (DEBUG) console.log('DOMContentLoaded - Initializing animations');
  
  // Skip all animations if user prefers reduced motion
  if (prefersReducedMotion()) {
    if (DEBUG) console.log('Reduced motion preferred - skipping all animations');
    // Make all elements visible immediately
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }
  
  // Register GSAP plugins (available via CDN)
  gsap.registerPlugin(ScrollTrigger);
  
  // Only register SplitText if available
  if (isSplitTextAvailable()) {
    gsap.registerPlugin(SplitText);
    if (DEBUG) console.log('SplitText plugin registered');
  } else {
    if (DEBUG) console.warn('SplitText plugin not available - text animations will be skipped');
  }
  
  const animateElements = document.querySelectorAll('[data-animate]');
  if (DEBUG) console.log(`Found ${animateElements.length} elements to animate`);

  animateElements.forEach((element, index) => {
    if (DEBUG) console.log(`\nProcessing element #${index + 1}:`, element);
    
    const type = element.getAttribute('data-animate-type') || 'standard';
    const animation = element.getAttribute('data-animate');
    const duration = parseFloat(element.getAttribute('data-animate-duration')) || 1;
    const stagger = parseFloat(element.getAttribute('data-animate-stagger')) || 0.5;
    const start = element.getAttribute('data-animate-start') || 'top 90%';
    const end = element.getAttribute('data-animate-end') || 'bottom top';
    const actions = element.getAttribute('data-animate-actions') || 'play none none reverse';
    const debug = element.getAttribute('data-animate-debug') === 'true';
    const disable = element.getAttribute('data-animate-disable');

    if (DEBUG) {
      console.log('Animation properties:', {
        type, animation, duration, stagger, start, end, actions, debug, disable
      });
    }

    // Skip if disabled for mobile/tablet
    if (disable) {
      const shouldSkip = (
        (disable === 'mobile' && window.innerWidth < 768) ||
        (disable === 'tablet' && window.innerWidth < 1024) ||
        (disable === 'mobile-tablet' && window.innerWidth < 1024)
      );
      
      if (shouldSkip) {
        if (DEBUG) console.log('Skipping - disabled for this device size');
        // Make element visible immediately since animation is disabled
        element.style.opacity = '1';
        element.style.transform = 'none';
        return;
      }
    }

    // Handle different animation types
    switch (type) {
      case 'standard':
        if (DEBUG) console.log('Creating standard animation');
        // Set initial state (opacity: 0 + transform props)
        gsap.set(element, { opacity: 0, ...getTransformProps(animation) });
        
        gsap.to(element, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          skewX: 0,
          duration,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            toggleActions: actions,
            markers: debug,
          },
          onStart: () => DEBUG && console.log('Standard animation started for:', element),
          onComplete: () => DEBUG && console.log('Standard animation completed for:', element)
        });
        break;

      case 'scroll':
        if (DEBUG) console.log('Creating scroll animation');
        const scrollDistance = parseFloat(element.getAttribute('data-animate-distance')) || 100;
        const scrollDirection = element.getAttribute('data-animate-direction') || 'vertical';
        
        // Set initial state (opacity: 0 + transform props)
        const scrollProps = scrollDirection === 'horizontal' ? { x: 0 } : { y: 0 };
        gsap.set(element, { opacity: 0, ...scrollProps });
        
        gsap.to(element, {
          opacity: 1,
          [scrollDirection === 'horizontal' ? 'x' : 'y']: scrollDirection === 'horizontal' ? scrollDistance : scrollDistance,
          duration,
          ease: "none", // Linear movement for scroll effect
          scrollTrigger: {
            trigger: element,
            start,
            end,
            toggleActions: actions,
            markers: debug,
            scrub: true, // Ties animation progress to scroll position
            onUpdate: (self) => {
              if (DEBUG) console.log(`Scroll progress: ${Math.round(self.progress * 100)}%`);
            }
          },
          onStart: () => DEBUG && console.log('Scroll animation started for:', element),
          onComplete: () => DEBUG && console.log('Scroll animation completed for:', element)
        });
        break;

      case 'stagger':
        if (DEBUG) console.log(`Creating stagger animation with ${element.children.length} children`);
        // Use a more appropriate default stagger for stagger animations
        const staggerDelay = parseFloat(element.getAttribute('data-animate-stagger')) || 0.1;
        
        // Set initial state for all children (opacity: 0 + transform props)
        gsap.set(element.children, { opacity: 0, ...getTransformProps(animation) });
        gsap.set(element, { opacity: 1});
        
        gsap.to(element.children, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          skewX: 0,
          stagger: staggerDelay,
          duration,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            toggleActions: actions,
            markers: debug,
          },
          onStart: () => DEBUG && console.log('Stagger animation started for:', element),
          onComplete: () => DEBUG && console.log('Stagger animation completed for:', element)
        });
        break;

      case 'words':
      case 'letters':
        if (!isSplitTextAvailable()) {
          if (DEBUG) console.warn('SplitText not available - falling back to standard animation');
          // Fallback to standard animation
          gsap.set(element, { opacity: 0, ...getTransformProps(animation) });
          
          gsap.to(element, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            skewX: 0,
            duration,
            scrollTrigger: {
              trigger: element,
              start,
              end,
              toggleActions: actions,
              markers: debug,
            }
          });
          break;
        }

        if (DEBUG) console.log(`Creating ${type} animation`);
        const splitType = new SplitText(element, { 
          type: type === 'words' ? 'words' : 'chars' 
        });
        
        const targets = type === 'words' ? splitType.words : splitType.chars;
        
        // Set initial state (opacity: 0 + transform props)
        gsap.set(targets, { opacity: 0, ...getTransformProps(animation) });
        gsap.set(element, { opacity: 1});
        
        gsap.to(targets, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          skewX: 0,
          stagger,
          duration,
          scrollTrigger: {
            trigger: element,
            start,
            end,
            toggleActions: actions,
            markers: debug,
          },
          onStart: () => DEBUG && console.log(`${type} animation started for:`, element),
          onComplete: () => DEBUG && console.log(`${type} animation completed for:`, element)
        });
        break;

      default:
        if (DEBUG) console.warn(`Unknown animation type: ${type}`);
        break;
    }
  });

  if (DEBUG) console.log('Animation initialization complete');
});
