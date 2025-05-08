
import { useState, useEffect } from 'react';
import { storage } from '@/lib/firebase/config';
import { ref, getDownloadURL } from 'firebase/storage';

export const useGetNoteImages = (urls: string[], setIsImagesLoading: (isImagesLoading: boolean) => void): [File[], (files: File[]) => void] => {
    const [contents, setContents] = useState<File[]>([]);

    useEffect(() => {
        const init = async () => {
            setIsImagesLoading(true)
            const files = await fetchNoteImages(urls)
            setContents(files)
            setIsImagesLoading(false)
        }
        init()
    }, [urls])

    return [contents, setContents]
}

const fetchNoteImages = async (urls: string[]): Promise<File[]> => {
    const files: File[] = []

    for (let index = 0; index < urls.length; index++) {
        const imageUrl = await getDownloadURL(ref(storage, urls[index]));
        const imageResponse = await fetch(imageUrl);

        if (!imageResponse.ok) {
            throw new Error('Failed to fetch image');
        }

        const imageBlob = await imageResponse.blob();
        const arrayBuffer = await imageBlob.arrayBuffer();
        const mimeType = imageBlob.type;

        const file = new File([arrayBuffer], `image_${Date.now()}.jpg`, { type: mimeType })

        files.push(file)
    }

    return files
}