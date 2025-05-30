# Animation Library

This project provides a lightweight animation library using GSAP (GreenSock Animation Platform) for smooth and performant animations. It supports various animation types, including standard animations, stagger animations, and text animations (words and letters).

## Features

- **Standard Animations**: Fade, scale, and skew effects with customizable durations.
- **Stagger Animations**: Animate child elements with a staggered delay.
- **Text Animations**: Animate text word-by-word or letter-by-letter (requires SplitText plugin).
- **Reduced Motion Support**: Automatically skips animations if the user prefers reduced motion.
- **Debug Mode**: Logs detailed animation progress to the console when enabled.

## Animation Types

### Standard Animations
Standard animations are applied to individual elements. Use the `data-animate-type="standard"` attribute (default).

**Example:**
```html
<div data-animate="fade-up" data-animate-duration="1">
  Standard fade-up animation
</div>
```

**Available Effects:**
- `fade-up`, `fade-down`, `fade-left`, `fade-right`
- `scale-in`, `scale-out`
- `skew-left`, `skew-right`

---

### Stagger Animations
Stagger animations apply to child elements with a delay between each. Use the `data-animate-type="stagger"` attribute.

**Example:**
```html
<div data-animate="fade-up" data-animate-type="stagger" data-animate-stagger="0.2">
  <div>Child 1</div>
  <div>Child 2</div>
  <div>Child 3</div>
</div>
```

**Notes:**
- The `data-animate-stagger` attribute controls the delay between child animations.

---

### Text Animations (Words)
Animate text word-by-word. Requires the SplitText plugin and `data-animate-type="words"`.

**Example:**
```html
<div data-animate="fade-up" data-animate-type="words">
  Animate this text word by word.
</div>
```

**Notes:**
- Ensure the SplitText plugin is loaded.

---

### Text Animations (Letters)
Animate text letter-by-letter. Requires the SplitText plugin and `data-animate-type="letters"`.

**Example:**
```html
<div data-animate="fade-up" data-animate-type="letters">
  Animate this text letter by letter.
</div>
```

**Notes:**
- Ensure the SplitText plugin is loaded.
- Works best with short text for performance.

---

### Reduced Motion Support
Animations are automatically skipped if the user prefers reduced motion (respects `prefers-reduced-motion` media query).

**Example:**
```html
<div data-animate="fade-up" data-animate-disable="reduced-motion">
  This animation respects reduced motion preferences.
</div>
```

**Notes:**
- Use `data-animate-disable="reduced-motion"` to explicitly disable animations for reduced motion users.

---

### Debug Mode
Enable debug logging by setting `DEBUG = true` in `index.js` or using `data-animate-debug="true"`.

**Example:**
```html
<div data-animate="fade-up" data-animate-debug="true">
  Debug mode enabled for this animation.
</div>
```

**Notes:**
- Debug logs include animation start/end times and progress updates.

## Installation

1. Include the GSAP library and plugins via CDN in your HTML file:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
   ```
2. Include the library script (`index.js`) in your HTML file:
   ```html
   <script src="index.js"></script>
   ```

## Usage

### HTML Setup
Add the `data-animate` attribute to any element you want to animate. Customize the animation using additional data attributes:

```html
<div 
  data-animate="fade-up" 
  data-animate-duration="1" 
  data-animate-stagger="0.1"
  data-animate-type="standard"
>
  Animate me!
</div>
```

### Available Data Attributes

| Attribute | Description | Default |
|-----------|-------------|---------|
| `data-animate` | Type of animation (e.g., `fade-up`, `scale-in`). | Required |
| `data-animate-type` | Animation type (`standard`, `stagger`, `words`, `letters`). | `standard` |
| `data-animate-duration` | Duration of the animation in seconds. | `1` |
| `data-animate-stagger` | Delay between staggered animations in seconds. | `0.5` |
| `data-animate-start` | ScrollTrigger start position. | `top 90%` |
| `data-animate-end` | ScrollTrigger end position. | `bottom top` |
| `data-animate-actions` | ScrollTrigger toggle actions. | `play none none reverse` |
| `data-animate-debug` | Enable debug logging (`true`/`false`). | `false` |
| `data-animate-disable` | Disable for specific devices (`mobile`, `tablet`, `mobile-tablet`). | None |


1. **`data-animate`**  
   - **Function**: Specifies the type of animation to apply (e.g., `fade-up`, `fade-down`, `fade-right`, `fade-left`, `scale-up`, `scale-in`, `skew`).  
   - **Example**:  
     ```html
     data-animate="fade-up"
     ```

2. **`data-animate-type`**  
   - **Function**: Defines the animation type (e.g., `standard`, `scroll`, `stagger`, `words`, `letters`).  
   - **Example**:  
     ```html
     data-animate-type="stagger"
     ```

3. **`data-animate-duration`**  
   - **Function**: Sets the duration of the animation in seconds.  
   - **Example**:  
     ```html
     data-animate-duration="1.5"
     ```

4. **`data-animate-stagger`**  
   - **Function**: Specifies the delay between animations for staggered effects (e.g., for child elements).  
   - **Example**:  
     ```html
     data-animate-stagger="0.2"
     ```

5. **`data-animate-start`**  
   - **Function**: Defines the starting point of the animation relative to the viewport (e.g., `top 90%`).  
   - **Example**:  
     ```html
     data-animate-start="top 80%"
     ```

6. **`data-animate-end`**  
   - **Function**: Defines the ending point of the animation relative to the viewport (e.g., `bottom top`).  
   - **Example**:  
     ```html
     data-animate-end="bottom 20%"
     ```

7. **`data-animate-actions`**  
   - **Function**: Controls the behavior of the animation on scroll (e.g., `play none none reverse`).  
   - **Example**:  
     ```html
     data-animate-actions="play pause resume reset"
     ```

8. **`data-animate-debug`**  
   - **Function**: Enables debug markers for the animation (e.g., `true` or `false`).  
   - **Example**:  
     ```html
     data-animate-debug="true"
     ```

9. **`data-animate-disable`**  
   - **Function**: Disables the animation for specific device sizes (e.g., `mobile`, `tablet`, `mobile-tablet`).  
   - **Example**:  
     ```html
     data-animate-disable="mobile"
     ```

10. **`data-animate-distance`**  
    - **Function**: Specifies the distance for scroll animations (e.g., `100` pixels).  
    - **Example**:  
      ```html
      data-animate-distance="200"
      ```

11. **`data-animate-direction`**  
    - **Function**: Defines the direction for scroll animations (`vertical` or `horizontal`).  
    - **Example**:  
      ```html
      data-animate-direction="horizontal"
      ```

---

### **Special Notes**
- The `data-animate` attribute is **required** for any element you want to animate.
- The `data-animate-type` attribute determines the animation behavior (e.g., standard, scroll, stagger, etc.).
- Debugging can be enabled globally via the `DEBUG` flag in the script or per element using `data-animate-debug`.


### Advanced Usage

#### Custom Easing
You can customize the easing of animations by adding the `data-animate-ease` attribute:
```html
<div data-animate="fade-up" data-animate-ease="power2.out">
  Custom easing applied!
</div>
```

#### Callbacks
Use the `data-animate-on-start` and `data-animate-on-complete` attributes to trigger JavaScript functions when the animation starts or completes:
```html
<div 
  data-animate="fade-up" 
  data-animate-on-start="console.log('Animation started')"
  data-animate-on-complete="console.log('Animation completed')"
>
  Callbacks example
</div>
```

### Troubleshooting

#### Animations Not Playing
- Ensure the GSAP library and plugins are correctly loaded.
- Check the browser console for errors.
- Verify that the `data-animate` attribute is correctly applied.

#### Debugging
Set `DEBUG = true` in `index.js` to enable detailed console logging for animations.

### Example

See the `test.html` file for a comprehensive example of all supported animation types.

## License

This project is open-source and available under the [MIT License](LICENSE).
