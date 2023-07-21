import { onMounted, onUnmounted, ref } from 'vue';
export var useClickOutside = function (elementRef) {
    var isClickOutside = ref(false);
    var handler = function (e) {
        if (elementRef.value) {
            if (elementRef.value.contains(e.target)) {
                isClickOutside.value = false;
            }
            else {
                isClickOutside.value = true;
            }
        }
    };
    onMounted(function () {
        document.addEventListener('click', handler);
    });
    onUnmounted(function () {
        document.removeEventListener('click', handler);
    });
    return isClickOutside;
};
