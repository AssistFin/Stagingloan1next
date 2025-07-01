import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useLoanNavigation = (loanData) => {
    const router = useRouter();

    useEffect(() => {
        if (typeof window === "undefined") return; 

        if (!loanData) {
            if (router.pathname !== '/applyforaloan') {
                router.replace('/applyforaloan');
            }
            return;
        }
        const nextStep = loanData.next_step || 'applyforaloan';

        // ✅ Prevent redundant navigation
        if (router.pathname !== `/${nextStep}`) {
            router.replace(`/${nextStep}`);
        }
    }, [loanData, router]);
};

export default useLoanNavigation;
