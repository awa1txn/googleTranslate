"use client";
import { useEffect, useState } from "react";
import { getCookie, hasCookie, setCookie } from 'cookies-next';

export default function GoogleTranslate() {

  const [selected, setSelected] = useState(getCookie('googtrans') || '/auto/en');
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    var addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  useEffect(() => {
    if (hasCookie('googtrans')) {
      setSelected(getCookie('googtrans'));
    } else {
      setSelected('/auto/en');
    }
    setInitialRender(false);
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({
      pageLanguage: 'auto',
      autoDisplay: false,
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
    },
      'google_translate_element');
  }

  useEffect(() => {
    if (!initialRender) {
      // Use this block to handle the language change effect
      const handleLangChange = () => {
        if (hasCookie('googtrans')) {
          setCookie('googtrans', decodeURI(selected));
        } else {
          setCookie('googtrans', selected);
        }
      };

      handleLangChange(); // Initial call to handle the language change
    }

    // Cleanup function to prevent memory leaks
    return () => {
      // Any cleanup code if needed
    };
  }, [selected, initialRender]);

  return (
    <>
      <div id="google_translate_element" style={{ width: '0px', height: '0px', position: 'absolute', left: '50%', zIndex: -99999, display:'none' }}></div>
    </>
  )
}
