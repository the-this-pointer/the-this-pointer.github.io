import { defineComponent, h, onBeforeUpdate, ref } from 'vue';
export default defineComponent({
    name: 'CodeGroup',
    setup: function (_, _a) {
        var slots = _a.slots;
        // index of current active item
        var activeIndex = ref(-1);
        // refs of the tab buttons
        var tabRefs = ref([]);
        if (__VUEPRESS_DEV__) {
            // after removing a code-group-item, we need to clear the ref
            // of the removed item to avoid issues caused by HMR
            onBeforeUpdate(function () {
                tabRefs.value = [];
            });
        }
        // activate next tab
        var activateNext = function (i) {
            if (i === void 0) { i = activeIndex.value; }
            if (i < tabRefs.value.length - 1) {
                activeIndex.value = i + 1;
            }
            else {
                activeIndex.value = 0;
            }
            tabRefs.value[activeIndex.value].focus();
        };
        // activate previous tab
        var activatePrev = function (i) {
            if (i === void 0) { i = activeIndex.value; }
            if (i > 0) {
                activeIndex.value = i - 1;
            }
            else {
                activeIndex.value = tabRefs.value.length - 1;
            }
            tabRefs.value[activeIndex.value].focus();
        };
        // handle keyboard event
        var keyboardHandler = function (event, i) {
            if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault();
                activeIndex.value = i;
            }
            else if (event.key === 'ArrowRight') {
                event.preventDefault();
                activateNext(i);
            }
            else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                activatePrev(i);
            }
        };
        return function () {
            // NOTICE: here we put the `slots.default()` inside the render function to make
            // the slots reactive, otherwise the slot content won't be changed once the
            // `setup()` function of current component is called
            var _a;
            // get children code-group-item
            var items = (((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)) || [])
                .filter(function (vnode) { return vnode.type.name === 'CodeGroupItem'; })
                .map(function (vnode) {
                if (vnode.props === null) {
                    vnode.props = {};
                }
                return vnode;
            });
            // do not render anything if there is no code-group-item
            if (items.length === 0) {
                return null;
            }
            if (activeIndex.value < 0 || activeIndex.value > items.length - 1) {
                // if `activeIndex` is invalid
                // find the index of the code-group-item with `active` props
                activeIndex.value = items.findIndex(function (vnode) { return vnode.props.active === '' || vnode.props.active === true; });
                // if there is no `active` props on code-group-item, set the first item active
                if (activeIndex.value === -1) {
                    activeIndex.value = 0;
                }
            }
            else {
                // set the active item
                items.forEach(function (vnode, i) {
                    vnode.props.active = i === activeIndex.value;
                });
            }
            return h('div', { class: 'code-group' }, [
                h('div', { class: 'code-group__nav' }, h('ul', { class: 'code-group__ul' }, items.map(function (vnode, i) {
                    var isActive = i === activeIndex.value;
                    return h('li', { class: 'code-group__li' }, h('button', {
                        ref: function (element) {
                            if (element) {
                                tabRefs.value[i] = element;
                            }
                        },
                        class: {
                            'code-group__nav-tab': true,
                            'code-group__nav-tab-active': isActive,
                        },
                        ariaPressed: isActive,
                        ariaExpanded: isActive,
                        onClick: function () { return (activeIndex.value = i); },
                        onKeydown: function (e) { return keyboardHandler(e, i); },
                    }, vnode.props.title));
                }))),
                items,
            ]);
        };
    },
});
