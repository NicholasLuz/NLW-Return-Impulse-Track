import React, { useState } from 'react';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import { 
    View,
    TextInput,
    Image,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import * as FileSystem from 'expo-file-system';

import { FeedbackType } from '../../components/Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';

import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';

import { styles } from './styles';
import { api } from '../../libs/api';

interface FormProps {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: FormProps) {
    const [ isSendingFeedback, setIsSendingFeedback ] = useState(false);
    const [ screenshot, setScreenshot ] = useState<string | null>(null);
    const [ comment, setComment ] = useState('');

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
        .then(uri => setScreenshot(uri))
        .catch(error => console.log(error));
    }

    function handleScreenshotRemove() {
        setScreenshot(null);
    }

    async function handleSendFeedback() {
        if (isSendingFeedback) {
            return;
        }

        setIsSendingFeedback(true);

        const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });
        const screenshotFinal = screenshotBase64 ? `data:image/png;base64, ${screenshotBase64}` : null;
        
        try{
            await api.post('/feedbacks', {
                type: feedbackType,
                screenshot: screenshotFinal,
                comment 
            });

            onFeedbackSent();
        }catch (error) {
            console.log(error);
            setIsSendingFeedback(false);
        }
    }

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity onPress={onFeedbackCanceled}>
                    <ArrowLeft 
                        size={24}
                        weight="bold"
                        color={theme.colors.text_secondary}
                    />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image 
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>

            <TextInput
                multiline
                style={styles.input}
                placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
                placeholderTextColor={theme.colors.text_secondary}
                onChangeText={setComment}
            />

            <View style={styles.footer}>
                <ScreenshotButton 
                    onScreenshotTaken={handleScreenshot}
                    onScreenshotRemoved={handleScreenshotRemove}
                    screenshot={screenshot}
                />

                <Button 
                    onPress={handleSendFeedback}
                    isLoading={isSendingFeedback}
                />
            </View>

        </View>
    );
}