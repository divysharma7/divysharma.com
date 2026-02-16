
import { ref } from 'vue';

export function useHapticFeedback() {
    const triggerHaptic = (type = 'light') => {
        // Check for window existence (client-side check)
        if (typeof window === 'undefined') return;

        try {
            if ('vibrate' in navigator) {
                let pattern = 10;
                switch (type) {
                    case 'light': pattern = 10; break;
                    case 'medium': pattern = 20; break;
                    case 'heavy': pattern = 40; break;
                    case 'selection': pattern = [10]; break;
                    case 'impact': pattern = [15, 10, 15]; break;
                }
                navigator.vibrate(pattern);
            }
        } catch (error) {
            console.debug('Haptic feedback not supported:', error);
        }
    };

    const isMobile = () => {
        if (typeof window === 'undefined') return false;
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    return { triggerHaptic, isMobile };
}

