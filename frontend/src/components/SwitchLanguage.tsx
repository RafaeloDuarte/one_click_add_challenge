import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
    toggleLanguage: () => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ toggleLanguage }) => {
    const { i18n } = useTranslation();

    return (
        <Row>
            <Col className="text-end">
                <Button onClick={toggleLanguage} variant="secondary" data-testid="language-switcher">
                    {i18n.language === 'en' ? 'Português' : 'English'}
                </Button>
            </Col>
        </Row>
    );
};

export default LanguageSwitcher;