import React, { useContext } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';

const TrackForm = () => {
    const { state: { trackName, recording, locations }, changeName, startRecording, stopRecording } = useContext(LocationContext)
    const [saveTrack] = useSaveTrack();
    // console.log(locations.length)
    return (
        <View>
            <Spacer>
                <Input value={trackName} onChangeText={changeName} placeholder="Enter track name" />
            </Spacer>
            <Spacer>
                {recording ? <Button title="Stop"  onPress={ stopRecording }/> : <Button title="Start Recording"  onPress={ startRecording }/>}
            </Spacer>
            <Spacer>
                {!recording  && locations.length ? <Button title="Save Recording" onPress={saveTrack}/> : null}
            </Spacer>
        </View>
    )
};

export default TrackForm;