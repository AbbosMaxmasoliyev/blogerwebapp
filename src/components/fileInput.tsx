import React, { useState } from 'react';
import axios from 'axios';
import { API_PREFIX } from '../services/config';

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus('Fayl tanlanmagan');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(
                `${API_PREFIX}/upload`, // O'zingizning server URL'ingiz
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setStatus('Fayl muvaffaqiyatli yuklandi: ' + JSON.stringify(response.data));
        } catch (error) {
            console.error('Fayl yuklashda xatolik:', error);
            setStatus('Fayl yuklashda xatolik yuz berdi');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Yuklash</button>
            <p>{status}</p>
        </div>
    );
};

export default FileUpload;
