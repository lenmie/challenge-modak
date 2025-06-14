import React from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';

interface GenericAlertModalProps {
    isOpen: boolean;
    title?: string;
    message: string;
    onClose: () => void;
    confirmText?: string;
}

const Overlay = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.4);
    justify-content: center;
    align-items: center;
`;

const Container = styled.View`
    background-color: #fff;
    border-radius: 8px;
    padding: 24px;
    min-width: 300px;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.2;
    shadow-radius: 8px;
    elevation: 5;
`;

const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-top: 0px;
    margin-bottom: 12px;
`;

const Message = styled.Text`
    font-size: 16px;
    margin-bottom: 16px;
`;

const Button = styled.TouchableOpacity`
    margin-top: 8px;
    padding-vertical: 8px;
    padding-horizontal: 16px;
    border-radius: 4px;
    background-color: #007bff;
    align-self: flex-end;
`;

const ButtonText = styled.Text`
    color: #fff;
    font-weight: bold;
`;

const GenericAlertModal: React.FC<GenericAlertModalProps> = ({
    isOpen,
    title = 'Alert',
    message,
    onClose,
    confirmText = 'OK',
}) => {
    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Overlay>
                <Container>
                    <Title>{title}</Title>
                    <Message>{message}</Message>
                    <Button onPress={onClose}>
                        <ButtonText>{confirmText}</ButtonText>
                    </Button>
                </Container>
            </Overlay>
        </Modal>
    );
};

export default GenericAlertModal;
