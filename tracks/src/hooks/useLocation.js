import { useState, useEffect } from 'react';
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location';

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);
    // const [subscriber, setSubscriber] = useState(null);

    // const startWatching = async () => {
    //     try {
    //         await requestPermissionsAsync();
    //         const sub = await watchPositionAsync({
    //             accuracy: Accuracy.BestForNavigation,
    //             timeInterval: 1000,
    //             distanceInterval: 10,
    //         }, 
    //         callback
    //         );
    //         setSubscriber(sub)
    //     } catch (error) {
    //         setErr(error)
    //     }
    // }

    useEffect(() => {
        let subscriber;
        const startWatching = async () => {
            try {
                await requestPermissionsAsync();
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10,
                }, 
                callback
                );
                // setSubscriber(sub)
            } catch (error) {
                setErr(error)
            }
        }

        if(shouldTrack) {
            startWatching();
        }
        else{
            if (subscriber) {
                subscriber.remove();
            }
            // setSubscriber(null);
            subscriber = null;
        }

        return () => {
            if (subscriber) {
                subscriber.remove()
            }
        };
    },[shouldTrack, callback]);

    return [err]
}