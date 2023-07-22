import { useDarkMode, useThemeOptions } from '../hooks';
import { computed } from 'vue';
export var useBloger = function () {
    var themeOptions = useThemeOptions();
    var isDarkMode = useDarkMode();
    var _a = themeOptions.value, blogger = _a.blogger, slogan = _a.slogan;
    var avatarSrc = computed(function () {
        var _a = themeOptions.value, avatar = _a.avatar, darkAvatar = _a.darkAvatar;
        return (isDarkMode.value ? darkAvatar : avatar) || avatar;
    });
    return {
        avatarSrc: avatarSrc,
        blogger: blogger,
        slogan: slogan,
    };
};
