let DEBUG = false;

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

// Initialize animations based on data attributes
document.addEventListener('DOMContentLoaded', () => {
  if (DEBUG) console.log('DOMContentLoaded - Initializing animations');
  
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
        return;
      }
    }

    // Handle different animation types
    switch (type) {
      case 'standard':
        if (DEBUG) console.log('Creating standard animation');
        // Set initial state
        gsap.set(element, { 
          opacity: 0,
          ...getTransformProps(animation)
        });
        
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

      case 'stagger':
        if (DEBUG) console.log(`Creating stagger animation with ${element.children.length} children`);
        // Set initial state for all children
        gsap.set(element.children, { 
          opacity: 0,
          y: 20
        });
        
        gsap.to(element.children, {
          opacity: 1,
          y: 0,
          stagger,
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
          gsap.set(element, { 
            opacity: 0,
            ...getTransformProps(animation)
          });
          
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
        
        // Set initial state
        gsap.set(targets, { 
          opacity: 0,
          ...getTransformProps(animation)
        });
        
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
