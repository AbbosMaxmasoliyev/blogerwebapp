declare global {
    interface Window {
        Telegram: {
            WebApp: {
                ready: () => void;
                expand: () => void;
                close: () => void;
                MainButton: {
                    setText: (text: string) => void;
                    show: () => void;
                    onClick: (callback: () => void) => void;
                };
                sendData: (data: string) => void;
            };
        };
    }
}

export {};