import React, { useState } from 'react';
import axios from 'axios';

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
        formData.append('document', file);

        try {
            const response = await axios.post(
                `https://api.telegram.org/bot6739637081:AAGgnoDSHWV69Dbhb95GOzf0UzcODf2Ou7w/sendDocument`,
                {
                    chat_id: "1094968462",
                    document: file,
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log(response);

            setStatus('Fayl muvaffaqiyatli yuklandi');
        } catch (error) {
            console.error('Fayl yuklash xatolik:', error);
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
