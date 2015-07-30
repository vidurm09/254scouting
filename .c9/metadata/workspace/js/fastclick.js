{"filter":false,"title":"fastclick.js","tooltip":"/js/fastclick.js","undoManager":{"mark":0,"position":0,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":841,"column":0},"action":"insert","lines":[";(function () {","\t'use strict';","","\t/**","\t * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.","\t *","\t * @codingstandard ftlabs-jsv2","\t * @copyright The Financial Times Limited [All Rights Reserved]","\t * @license MIT License (see LICENSE.txt)","\t */","","\t/*jslint browser:true, node:true*/","\t/*global define, Event, Node*/","","","\t/**","\t * Instantiate fast-clicking listeners on the specified layer.","\t *","\t * @constructor","\t * @param {Element} layer The layer to listen on","\t * @param {Object} [options={}] The options to override the defaults","\t */","\tfunction FastClick(layer, options) {","\t\tvar oldOnClick;","","\t\toptions = options || {};","","\t\t/**","\t\t * Whether a click is currently being tracked.","\t\t *","\t\t * @type boolean","\t\t */","\t\tthis.trackingClick = false;","","","\t\t/**","\t\t * Timestamp for when click tracking started.","\t\t *","\t\t * @type number","\t\t */","\t\tthis.trackingClickStart = 0;","","","\t\t/**","\t\t * The element being tracked for a click.","\t\t *","\t\t * @type EventTarget","\t\t */","\t\tthis.targetElement = null;","","","\t\t/**","\t\t * X-coordinate of touch start event.","\t\t *","\t\t * @type number","\t\t */","\t\tthis.touchStartX = 0;","","","\t\t/**","\t\t * Y-coordinate of touch start event.","\t\t *","\t\t * @type number","\t\t */","\t\tthis.touchStartY = 0;","","","\t\t/**","\t\t * ID of the last touch, retrieved from Touch.identifier.","\t\t *","\t\t * @type number","\t\t */","\t\tthis.lastTouchIdentifier = 0;","","","\t\t/**","\t\t * Touchmove boundary, beyond which a click will be cancelled.","\t\t *","\t\t * @type number","\t\t */","\t\tthis.touchBoundary = options.touchBoundary || 10;","","","\t\t/**","\t\t * The FastClick layer.","\t\t *","\t\t * @type Element","\t\t */","\t\tthis.layer = layer;","","\t\t/**","\t\t * The minimum time between tap(touchstart and touchend) events","\t\t *","\t\t * @type number","\t\t */","\t\tthis.tapDelay = options.tapDelay || 200;","","\t\t/**","\t\t * The maximum time for a tap","\t\t *","\t\t * @type number","\t\t */","\t\tthis.tapTimeout = options.tapTimeout || 700;","","\t\tif (FastClick.notNeeded(layer)) {","\t\t\treturn;","\t\t}","","\t\t// Some old versions of Android don't have Function.prototype.bind","\t\tfunction bind(method, context) {","\t\t\treturn function() { return method.apply(context, arguments); };","\t\t}","","","\t\tvar methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];","\t\tvar context = this;","\t\tfor (var i = 0, l = methods.length; i < l; i++) {","\t\t\tcontext[methods[i]] = bind(context[methods[i]], context);","\t\t}","","\t\t// Set up event handlers as required","\t\tif (deviceIsAndroid) {","\t\t\tlayer.addEventListener('mouseover', this.onMouse, true);","\t\t\tlayer.addEventListener('mousedown', this.onMouse, true);","\t\t\tlayer.addEventListener('mouseup', this.onMouse, true);","\t\t}","","\t\tlayer.addEventListener('click', this.onClick, true);","\t\tlayer.addEventListener('touchstart', this.onTouchStart, false);","\t\tlayer.addEventListener('touchmove', this.onTouchMove, false);","\t\tlayer.addEventListener('touchend', this.onTouchEnd, false);","\t\tlayer.addEventListener('touchcancel', this.onTouchCancel, false);","","\t\t// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)","\t\t// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick","\t\t// layer when they are cancelled.","\t\tif (!Event.prototype.stopImmediatePropagation) {","\t\t\tlayer.removeEventListener = function(type, callback, capture) {","\t\t\t\tvar rmv = Node.prototype.removeEventListener;","\t\t\t\tif (type === 'click') {","\t\t\t\t\trmv.call(layer, type, callback.hijacked || callback, capture);","\t\t\t\t} else {","\t\t\t\t\trmv.call(layer, type, callback, capture);","\t\t\t\t}","\t\t\t};","","\t\t\tlayer.addEventListener = function(type, callback, capture) {","\t\t\t\tvar adv = Node.prototype.addEventListener;","\t\t\t\tif (type === 'click') {","\t\t\t\t\tadv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {","\t\t\t\t\t\tif (!event.propagationStopped) {","\t\t\t\t\t\t\tcallback(event);","\t\t\t\t\t\t}","\t\t\t\t\t}), capture);","\t\t\t\t} else {","\t\t\t\t\tadv.call(layer, type, callback, capture);","\t\t\t\t}","\t\t\t};","\t\t}","","\t\t// If a handler is already declared in the element's onclick attribute, it will be fired before","\t\t// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and","\t\t// adding it as listener.","\t\tif (typeof layer.onclick === 'function') {","","\t\t\t// Android browser on at least 3.2 requires a new reference to the function in layer.onclick","\t\t\t// - the old one won't work if passed to addEventListener directly.","\t\t\toldOnClick = layer.onclick;","\t\t\tlayer.addEventListener('click', function(event) {","\t\t\t\toldOnClick(event);","\t\t\t}, false);","\t\t\tlayer.onclick = null;","\t\t}","\t}","","\t/**","\t* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.","\t*","\t* @type boolean","\t*/","\tvar deviceIsWindowsPhone = navigator.userAgent.indexOf(\"Windows Phone\") >= 0;","","\t/**","\t * Android requires exceptions.","\t *","\t * @type boolean","\t */","\tvar deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;","","","\t/**","\t * iOS requires exceptions.","\t *","\t * @type boolean","\t */","\tvar deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;","","","\t/**","\t * iOS 4 requires an exception for select elements.","\t *","\t * @type boolean","\t */","\tvar deviceIsIOS4 = deviceIsIOS && (/OS 4_\\d(_\\d)?/).test(navigator.userAgent);","","","\t/**","\t * iOS 6.0-7.* requires the target element to be manually derived","\t *","\t * @type boolean","\t */","\tvar deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\\d/).test(navigator.userAgent);","","\t/**","\t * BlackBerry requires exceptions.","\t *","\t * @type boolean","\t */","\tvar deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;","","\t/**","\t * Determine whether a given element requires a native click.","\t *","\t * @param {EventTarget|Element} target Target DOM element","\t * @returns {boolean} Returns true if the element needs a native click","\t */","\tFastClick.prototype.needsClick = function(target) {","\t\tswitch (target.nodeName.toLowerCase()) {","","\t\t// Don't send a synthetic click to disabled inputs (issue #62)","\t\tcase 'button':","\t\tcase 'select':","\t\tcase 'textarea':","\t\t\tif (target.disabled) {","\t\t\t\treturn true;","\t\t\t}","","\t\t\tbreak;","\t\tcase 'input':","","\t\t\t// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)","\t\t\tif ((deviceIsIOS && target.type === 'file') || target.disabled) {","\t\t\t\treturn true;","\t\t\t}","","\t\t\tbreak;","\t\tcase 'label':","\t\tcase 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames","\t\tcase 'video':","\t\t\treturn true;","\t\t}","","\t\treturn (/\\bneedsclick\\b/).test(target.className);","\t};","","","\t/**","\t * Determine whether a given element requires a call to focus to simulate click into element.","\t *","\t * @param {EventTarget|Element} target Target DOM element","\t * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.","\t */","\tFastClick.prototype.needsFocus = function(target) {","\t\tswitch (target.nodeName.toLowerCase()) {","\t\tcase 'textarea':","\t\t\treturn true;","\t\tcase 'select':","\t\t\treturn !deviceIsAndroid;","\t\tcase 'input':","\t\t\tswitch (target.type) {","\t\t\tcase 'button':","\t\t\tcase 'checkbox':","\t\t\tcase 'file':","\t\t\tcase 'image':","\t\t\tcase 'radio':","\t\t\tcase 'submit':","\t\t\t\treturn false;","\t\t\t}","","\t\t\t// No point in attempting to focus disabled inputs","\t\t\treturn !target.disabled && !target.readOnly;","\t\tdefault:","\t\t\treturn (/\\bneedsfocus\\b/).test(target.className);","\t\t}","\t};","","","\t/**","\t * Send a click event to the specified element.","\t *","\t * @param {EventTarget|Element} targetElement","\t * @param {Event} event","\t */","\tFastClick.prototype.sendClick = function(targetElement, event) {","\t\tvar clickEvent, touch;","","\t\t// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)","\t\tif (document.activeElement && document.activeElement !== targetElement) {","\t\t\tdocument.activeElement.blur();","\t\t}","","\t\ttouch = event.changedTouches[0];","","\t\t// Synthesise a click event, with an extra attribute so it can be tracked","\t\tclickEvent = document.createEvent('MouseEvents');","\t\tclickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);","\t\tclickEvent.forwardedTouchEvent = true;","\t\ttargetElement.dispatchEvent(clickEvent);","\t};","","\tFastClick.prototype.determineEventType = function(targetElement) {","","\t\t//Issue #159: Android Chrome Select Box does not open with a synthetic click event","\t\tif (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {","\t\t\treturn 'mousedown';","\t\t}","","\t\treturn 'click';","\t};","","","\t/**","\t * @param {EventTarget|Element} targetElement","\t */","\tFastClick.prototype.focus = function(targetElement) {","\t\tvar length;","","\t\t// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.","\t\tif (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {","\t\t\tlength = targetElement.value.length;","\t\t\ttargetElement.setSelectionRange(length, length);","\t\t} else {","\t\t\ttargetElement.focus();","\t\t}","\t};","","","\t/**","\t * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.","\t *","\t * @param {EventTarget|Element} targetElement","\t */","\tFastClick.prototype.updateScrollParent = function(targetElement) {","\t\tvar scrollParent, parentElement;","","\t\tscrollParent = targetElement.fastClickScrollParent;","","\t\t// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the","\t\t// target element was moved to another parent.","\t\tif (!scrollParent || !scrollParent.contains(targetElement)) {","\t\t\tparentElement = targetElement;","\t\t\tdo {","\t\t\t\tif (parentElement.scrollHeight > parentElement.offsetHeight) {","\t\t\t\t\tscrollParent = parentElement;","\t\t\t\t\ttargetElement.fastClickScrollParent = parentElement;","\t\t\t\t\tbreak;","\t\t\t\t}","","\t\t\t\tparentElement = parentElement.parentElement;","\t\t\t} while (parentElement);","\t\t}","","\t\t// Always update the scroll top tracker if possible.","\t\tif (scrollParent) {","\t\t\tscrollParent.fastClickLastScrollTop = scrollParent.scrollTop;","\t\t}","\t};","","","\t/**","\t * @param {EventTarget} targetElement","\t * @returns {Element|EventTarget}","\t */","\tFastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {","","\t\t// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.","\t\tif (eventTarget.nodeType === Node.TEXT_NODE) {","\t\t\treturn eventTarget.parentNode;","\t\t}","","\t\treturn eventTarget;","\t};","","","\t/**","\t * On touch start, record the position and scroll offset.","\t *","\t * @param {Event} event","\t * @returns {boolean}","\t */","\tFastClick.prototype.onTouchStart = function(event) {","\t\tvar targetElement, touch, selection;","","\t\t// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).","\t\tif (event.targetTouches.length > 1) {","\t\t\treturn true;","\t\t}","","\t\ttargetElement = this.getTargetElementFromEventTarget(event.target);","\t\ttouch = event.targetTouches[0];","","\t\tif (deviceIsIOS) {","","\t\t\t// Only trusted events will deselect text on iOS (issue #49)","\t\t\tselection = window.getSelection();","\t\t\tif (selection.rangeCount && !selection.isCollapsed) {","\t\t\t\treturn true;","\t\t\t}","","\t\t\tif (!deviceIsIOS4) {","","\t\t\t\t// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):","\t\t\t\t// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched","\t\t\t\t// with the same identifier as the touch event that previously triggered the click that triggered the alert.","\t\t\t\t// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an","\t\t\t\t// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.","\t\t\t\t// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,","\t\t\t\t// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,","\t\t\t\t// random integers, it's safe to to continue if the identifier is 0 here.","\t\t\t\tif (touch.identifier && touch.identifier === this.lastTouchIdentifier) {","\t\t\t\t\tevent.preventDefault();","\t\t\t\t\treturn false;","\t\t\t\t}","","\t\t\t\tthis.lastTouchIdentifier = touch.identifier;","","\t\t\t\t// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:","\t\t\t\t// 1) the user does a fling scroll on the scrollable layer","\t\t\t\t// 2) the user stops the fling scroll with another tap","\t\t\t\t// then the event.target of the last 'touchend' event will be the element that was under the user's finger","\t\t\t\t// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check","\t\t\t\t// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).","\t\t\t\tthis.updateScrollParent(targetElement);","\t\t\t}","\t\t}","","\t\tthis.trackingClick = true;","\t\tthis.trackingClickStart = event.timeStamp;","\t\tthis.targetElement = targetElement;","","\t\tthis.touchStartX = touch.pageX;","\t\tthis.touchStartY = touch.pageY;","","\t\t// Prevent phantom clicks on fast double-tap (issue #36)","\t\tif ((event.timeStamp - this.lastClickTime) < this.tapDelay) {","\t\t\tevent.preventDefault();","\t\t}","","\t\treturn true;","\t};","","","\t/**","\t * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.","\t *","\t * @param {Event} event","\t * @returns {boolean}","\t */","\tFastClick.prototype.touchHasMoved = function(event) {","\t\tvar touch = event.changedTouches[0], boundary = this.touchBoundary;","","\t\tif (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {","\t\t\treturn true;","\t\t}","","\t\treturn false;","\t};","","","\t/**","\t * Update the last position.","\t *","\t * @param {Event} event","\t * @returns {boolean}","\t */","\tFastClick.prototype.onTouchMove = function(event) {","\t\tif (!this.trackingClick) {","\t\t\treturn true;","\t\t}","","\t\t// If the touch has moved, cancel the click tracking","\t\tif (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {","\t\t\tthis.trackingClick = false;","\t\t\tthis.targetElement = null;","\t\t}","","\t\treturn true;","\t};","","","\t/**","\t * Attempt to find the labelled control for the given label element.","\t *","\t * @param {EventTarget|HTMLLabelElement} labelElement","\t * @returns {Element|null}","\t */","\tFastClick.prototype.findControl = function(labelElement) {","","\t\t// Fast path for newer browsers supporting the HTML5 control attribute","\t\tif (labelElement.control !== undefined) {","\t\t\treturn labelElement.control;","\t\t}","","\t\t// All browsers under test that support touch events also support the HTML5 htmlFor attribute","\t\tif (labelElement.htmlFor) {","\t\t\treturn document.getElementById(labelElement.htmlFor);","\t\t}","","\t\t// If no for attribute exists, attempt to retrieve the first labellable descendant element","\t\t// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label","\t\treturn labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');","\t};","","","\t/**","\t * On touch end, determine whether to send a click event at once.","\t *","\t * @param {Event} event","\t * @returns {boolean}","\t */","\tFastClick.prototype.onTouchEnd = function(event) {","\t\tvar forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;","","\t\tif (!this.trackingClick) {","\t\t\treturn true;","\t\t}","","\t\t// Prevent phantom clicks on fast double-tap (issue #36)","\t\tif ((event.timeStamp - this.lastClickTime) < this.tapDelay) {","\t\t\tthis.cancelNextClick = true;","\t\t\treturn true;","\t\t}","","\t\tif ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {","\t\t\treturn true;","\t\t}","","\t\t// Reset to prevent wrong click cancel on input (issue #156).","\t\tthis.cancelNextClick = false;","","\t\tthis.lastClickTime = event.timeStamp;","","\t\ttrackingClickStart = this.trackingClickStart;","\t\tthis.trackingClick = false;","\t\tthis.trackingClickStart = 0;","","\t\t// On some iOS devices, the targetElement supplied with the event is invalid if the layer","\t\t// is performing a transition or scroll, and has to be re-detected manually. Note that","\t\t// for this to function correctly, it must be called *after* the event target is checked!","\t\t// See issue #57; also filed as rdar://13048589 .","\t\tif (deviceIsIOSWithBadTarget) {","\t\t\ttouch = event.changedTouches[0];","","\t\t\t// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null","\t\t\ttargetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;","\t\t\ttargetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;","\t\t}","","\t\ttargetTagName = targetElement.tagName.toLowerCase();","\t\tif (targetTagName === 'label') {","\t\t\tforElement = this.findControl(targetElement);","\t\t\tif (forElement) {","\t\t\t\tthis.focus(targetElement);","\t\t\t\tif (deviceIsAndroid) {","\t\t\t\t\treturn false;","\t\t\t\t}","","\t\t\t\ttargetElement = forElement;","\t\t\t}","\t\t} else if (this.needsFocus(targetElement)) {","","\t\t\t// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.","\t\t\t// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).","\t\t\tif ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {","\t\t\t\tthis.targetElement = null;","\t\t\t\treturn false;","\t\t\t}","","\t\t\tthis.focus(targetElement);","\t\t\tthis.sendClick(targetElement, event);","","\t\t\t// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.","\t\t\t// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)","\t\t\tif (!deviceIsIOS || targetTagName !== 'select') {","\t\t\t\tthis.targetElement = null;","\t\t\t\tevent.preventDefault();","\t\t\t}","","\t\t\treturn false;","\t\t}","","\t\tif (deviceIsIOS && !deviceIsIOS4) {","","\t\t\t// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled","\t\t\t// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).","\t\t\tscrollParent = targetElement.fastClickScrollParent;","\t\t\tif (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {","\t\t\t\treturn true;","\t\t\t}","\t\t}","","\t\t// Prevent the actual click from going though - unless the target node is marked as requiring","\t\t// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.","\t\tif (!this.needsClick(targetElement)) {","\t\t\tevent.preventDefault();","\t\t\tthis.sendClick(targetElement, event);","\t\t}","","\t\treturn false;","\t};","","","\t/**","\t * On touch cancel, stop tracking the click.","\t *","\t * @returns {void}","\t */","\tFastClick.prototype.onTouchCancel = function() {","\t\tthis.trackingClick = false;","\t\tthis.targetElement = null;","\t};","","","\t/**","\t * Determine mouse events which should be permitted.","\t *","\t * @param {Event} event","\t * @returns {boolean}","\t */","\tFastClick.prototype.onMouse = function(event) {","","\t\t// If a target element was never set (because a touch event was never fired) allow the event","\t\tif (!this.targetElement) {","\t\t\treturn true;","\t\t}","","\t\tif (event.forwardedTouchEvent) {","\t\t\treturn true;","\t\t}","","\t\t// Programmatically generated events targeting a specific element should be permitted","\t\tif (!event.cancelable) {","\t\t\treturn true;","\t\t}","","\t\t// Derive and check the target element to see whether the mouse event needs to be permitted;","\t\t// unless explicitly enabled, prevent non-touch click events from triggering actions,","\t\t// to prevent ghost/doubleclicks.","\t\tif (!this.needsClick(this.targetElement) || this.cancelNextClick) {","","\t\t\t// Prevent any user-added listeners declared on FastClick element from being fired.","\t\t\tif (event.stopImmediatePropagation) {","\t\t\t\tevent.stopImmediatePropagation();","\t\t\t} else {","","\t\t\t\t// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)","\t\t\t\tevent.propagationStopped = true;","\t\t\t}","","\t\t\t// Cancel the event","\t\t\tevent.stopPropagation();","\t\t\tevent.preventDefault();","","\t\t\treturn false;","\t\t}","","\t\t// If the mouse event is permitted, return true for the action to go through.","\t\treturn true;","\t};","","","\t/**","\t * On actual clicks, determine whether this is a touch-generated click, a click action occurring","\t * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or","\t * an actual click which should be permitted.","\t *","\t * @param {Event} event","\t * @returns {boolean}","\t */","\tFastClick.prototype.onClick = function(event) {","\t\tvar permitted;","","\t\t// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.","\t\tif (this.trackingClick) {","\t\t\tthis.targetElement = null;","\t\t\tthis.trackingClick = false;","\t\t\treturn true;","\t\t}","","\t\t// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.","\t\tif (event.target.type === 'submit' && event.detail === 0) {","\t\t\treturn true;","\t\t}","","\t\tpermitted = this.onMouse(event);","","\t\t// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.","\t\tif (!permitted) {","\t\t\tthis.targetElement = null;","\t\t}","","\t\t// If clicks are permitted, return true for the action to go through.","\t\treturn permitted;","\t};","","","\t/**","\t * Remove all FastClick's event listeners.","\t *","\t * @returns {void}","\t */","\tFastClick.prototype.destroy = function() {","\t\tvar layer = this.layer;","","\t\tif (deviceIsAndroid) {","\t\t\tlayer.removeEventListener('mouseover', this.onMouse, true);","\t\t\tlayer.removeEventListener('mousedown', this.onMouse, true);","\t\t\tlayer.removeEventListener('mouseup', this.onMouse, true);","\t\t}","","\t\tlayer.removeEventListener('click', this.onClick, true);","\t\tlayer.removeEventListener('touchstart', this.onTouchStart, false);","\t\tlayer.removeEventListener('touchmove', this.onTouchMove, false);","\t\tlayer.removeEventListener('touchend', this.onTouchEnd, false);","\t\tlayer.removeEventListener('touchcancel', this.onTouchCancel, false);","\t};","","","\t/**","\t * Check whether FastClick is needed.","\t *","\t * @param {Element} layer The layer to listen on","\t */","\tFastClick.notNeeded = function(layer) {","\t\tvar metaViewport;","\t\tvar chromeVersion;","\t\tvar blackberryVersion;","\t\tvar firefoxVersion;","","\t\t// Devices that don't support touch don't need FastClick","\t\tif (typeof window.ontouchstart === 'undefined') {","\t\t\treturn true;","\t\t}","","\t\t// Chrome version - zero for other browsers","\t\tchromeVersion = +(/Chrome\\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];","","\t\tif (chromeVersion) {","","\t\t\tif (deviceIsAndroid) {","\t\t\t\tmetaViewport = document.querySelector('meta[name=viewport]');","","\t\t\t\tif (metaViewport) {","\t\t\t\t\t// Chrome on Android with user-scalable=\"no\" doesn't need FastClick (issue #89)","\t\t\t\t\tif (metaViewport.content.indexOf('user-scalable=no') !== -1) {","\t\t\t\t\t\treturn true;","\t\t\t\t\t}","\t\t\t\t\t// Chrome 32 and above with width=device-width or less don't need FastClick","\t\t\t\t\tif (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {","\t\t\t\t\t\treturn true;","\t\t\t\t\t}","\t\t\t\t}","","\t\t\t// Chrome desktop doesn't need FastClick (issue #15)","\t\t\t} else {","\t\t\t\treturn true;","\t\t\t}","\t\t}","","\t\tif (deviceIsBlackBerry10) {","\t\t\tblackberryVersion = navigator.userAgent.match(/Version\\/([0-9]*)\\.([0-9]*)/);","","\t\t\t// BlackBerry 10.3+ does not require Fastclick library.","\t\t\t// https://github.com/ftlabs/fastclick/issues/251","\t\t\tif (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {","\t\t\t\tmetaViewport = document.querySelector('meta[name=viewport]');","","\t\t\t\tif (metaViewport) {","\t\t\t\t\t// user-scalable=no eliminates click delay.","\t\t\t\t\tif (metaViewport.content.indexOf('user-scalable=no') !== -1) {","\t\t\t\t\t\treturn true;","\t\t\t\t\t}","\t\t\t\t\t// width=device-width (or less than device-width) eliminates click delay.","\t\t\t\t\tif (document.documentElement.scrollWidth <= window.outerWidth) {","\t\t\t\t\t\treturn true;","\t\t\t\t\t}","\t\t\t\t}","\t\t\t}","\t\t}","","\t\t// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)","\t\tif (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {","\t\t\treturn true;","\t\t}","","\t\t// Firefox version - zero for other browsers","\t\tfirefoxVersion = +(/Firefox\\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];","","\t\tif (firefoxVersion >= 27) {","\t\t\t// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896","","\t\t\tmetaViewport = document.querySelector('meta[name=viewport]');","\t\t\tif (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {","\t\t\t\treturn true;","\t\t\t}","\t\t}","","\t\t// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version","\t\t// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx","\t\tif (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {","\t\t\treturn true;","\t\t}","","\t\treturn false;","\t};","","","\t/**","\t * Factory method for creating a FastClick object","\t *","\t * @param {Element} layer The layer to listen on","\t * @param {Object} [options={}] The options to override the defaults","\t */","\tFastClick.attach = function(layer, options) {","\t\treturn new FastClick(layer, options);","\t};","","","\tif (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {","","\t\t// AMD. Register as an anonymous module.","\t\tdefine(function() {","\t\t\treturn FastClick;","\t\t});","\t} else if (typeof module !== 'undefined' && module.exports) {","\t\tmodule.exports = FastClick.attach;","\t\tmodule.exports.FastClick = FastClick;","\t} else {","\t\twindow.FastClick = FastClick;","\t}","}());",""]}]}]]},"ace":{"folds":[],"scrolltop":11133,"scrollleft":0,"selection":{"start":{"row":841,"column":0},"end":{"row":841,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":794,"state":"no_regex","mode":"ace/mode/javascript"}},"timestamp":1426907166547,"hash":"06cef196733a710e77ad7e386ced6963f092dc55"}