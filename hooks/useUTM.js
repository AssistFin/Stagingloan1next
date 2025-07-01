import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`;

const getAuthHeaders = () => {
    const token = Cookies.get("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
};

const useUTM = () => {
    const sendAnonymousUTM = async (utmParams) => {
        try {
            await axios.post(`${API_BASE_URL}/utm/store`, utmParams);
        } catch (error) {
            console.error('Error sending anonymous UTM data:', error);
        }
    };

    const sendAuthenticatedUTM = async (utmParams) => {
        try {
            await axios.post(`${API_BASE_URL}/utm/link-user`, utmParams, getAuthHeaders());
        } catch (error) {
            console.error('Error sending authenticated UTM data:', error);
        }
    };

    const captureUTMParams = () => {
        if (typeof window === 'undefined') return;

        const urlParams = new URLSearchParams(window.location.search);
        const utmParams = {
            utm_source: urlParams.get('utm_source'),
            utm_medium: urlParams.get('utm_medium'),
            utm_campaign: urlParams.get('utm_campaign'),
            utm_term: urlParams.get('utm_term'),
            utm_content: urlParams.get('utm_content'),
        };

        if (Object.values(utmParams).some(param => param !== null)) {
            localStorage.setItem('utm_data', JSON.stringify(utmParams));
            sendAnonymousUTM(utmParams);
        }
    };

    useEffect(() => {
        captureUTMParams();
    }, []);

    return { sendAuthenticatedUTM };
};

export default useUTM;