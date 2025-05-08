import { storage } from '@/lib/firebase/config';
import { ref } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';
import * as React from 'react';

export const useGetNoteImages = (urls: string[], setIsImagesLoading: (isImagesLoading: boolean) => void) => {
    const [contents, setContents] = React.useState<File[]>([]);

    React.useEffect(() => {
        const init = async () => {
            setIsImagesLoading(true)
            setContents(await fetchGameImages(urls))
            setIsImagesLoading(false)
        }
        init()
    }, [urls])

    return [contents, setContents]
}

const fetchGameImages = async (urls: string[]) => {
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