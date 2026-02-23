import React from 'react';
import {
    siWhatsapp,
    siGmail,
    siInstagram,
    siSupabase,
    siMessenger,
    siFirebase,
    siSnowflake,
    siHubspot,
    SimpleIcon
} from 'simple-icons';

// Brand Logo Props
interface BrandLogoProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

// Default size
const DEFAULT_SIZE = 40;

// Helper generic component for Simple Icons
const SimpleIconLogo = ({ icon, size = DEFAULT_SIZE, ...props }: { icon: SimpleIcon } & BrandLogoProps) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        fill={`#${icon.hex}`}
        {...props}
    >
        <title>{icon.title}</title>
        <path d={icon.path} />
    </svg>
);

// --- Simple Icons ---
export const WhatsAppLogo = (props: BrandLogoProps) => <SimpleIconLogo icon={siWhatsapp} {...props} />;
export const GmailLogo = (props: BrandLogoProps) => <SimpleIconLogo icon={siGmail} {...props} />;
export const InstagramLogo = (props: BrandLogoProps) => <SimpleIconLogo icon={siInstagram} {...props} />;
export const SupabaseLogo = (props: BrandLogoProps) => <SimpleIconLogo icon={siSupabase} {...props} />;
export const MessengerLogo = (props: BrandLogoProps) => <SimpleIconLogo icon={siMessenger} {...props} />;
export const FirebaseLogo = (props: BrandLogoProps) => <SimpleIconLogo icon={siFirebase} {...props} />;
export const SnowflakeLogo = (props: BrandLogoProps) => <SimpleIconLogo icon={siSnowflake} {...props} />;
export const HubSpotLogo = (props: BrandLogoProps) => <SimpleIconLogo icon={siHubspot} {...props} />;

// --- Fallbacks (Missing from local simple-icons package) ---
// Using previous multi-color officially styled SVGs as fallback

export const MicrosoftTeamsLogo = ({ size = DEFAULT_SIZE, ...props }: BrandLogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M10.5 13.5H23.5V26.5H10.5V13.5Z" fill="#5059C9" />
        <path d="M10.5 13.5L23.5 13.5V26.5L10.5 26.5V13.5Z" fill="#5059C9" />
        <path d="M7.5 13.5H10.5V26.5H7.5C5.8 26.5 4.5 25.2 4.5 23.5V16.5C4.5 14.8 5.8 13.5 7.5 13.5Z" fill="#3B42A4" />
        <path d="M23.5 13.5H26.5C28.2 13.5 29.5 14.8 29.5 16.5V23.5C29.5 25.2 28.2 26.5 26.5 26.5H23.5V13.5Z" fill="#3B42A4" />
        <path d="M10.5 5.5H23.5V13.5H10.5V5.5Z" fill="#7B83EB" />
        <path d="M7.5 5.5H10.5V13.5H7.5C5.8 13.5 4.5 12.2 4.5 10.5V8.5C4.5 6.8 5.8 5.5 7.5 5.5Z" fill="#5059C9" />
        <path d="M23.5 5.5H26.5C28.2 5.5 29.5 6.8 29.5 8.5V10.5C29.5 12.2 28.2 13.5 26.5 13.5H23.5V5.5Z" fill="#5059C9" />
        <path d="M17 10C17 11.1 16.1 12 15 12C13.9 12 13 11.1 13 10C13 8.9 13.9 8 15 8C16.1 8 17 8.9 17 10Z" fill="#FFF" />
        <path d="M21 10C21 11.1 20.1 12 19 12C17.9 12 17 11.1 17 10C17 8.9 17.9 8 19 8C20.1 8 21 8.9 21 10Z" fill="#FFF" />
    </svg>
);

export const SlackLogo = ({ size = DEFAULT_SIZE, ...props }: BrandLogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M8.5 20.5C7.1 20.5 6 21.6 6 23C6 24.4 7.1 25.5 8.5 25.5H11V23C11 21.6 9.9 20.5 8.5 20.5ZM12.5 20.5C13.9 20.5 15 21.6 15 23V28C15 29.4 13.9 30.5 12.5 30.5C11.1 30.5 10 29.4 10 28V23C10 21.6 11.1 20.5 12.5 20.5Z" fill="#E01E5A" />
        <path d="M11.5 8.5C11.5 9.9 10.4 11 9 11H6.5C5.1 11 4 9.9 4 8.5C4 7.1 5.1 6 6.5 6H9C10.4 6 11.5 7.1 11.5 8.5ZM11.5 12.5C11.5 11.1 10.4 10 9 10H4C2.6 10 1.5 11.1 1.5 12.5C1.5 13.9 2.6 15 4 15H9C10.4 15 11.5 13.9 11.5 12.5Z" fill="#36C5F0" />
        <path d="M23.5 11.5C24.9 11.5 26 10.4 26 9C26 7.6 24.9 6.5 23.5 6.5H21V9C21 10.4 22.1 11.5 23.5 11.5ZM19.5 11.5C18.1 11.5 17 10.4 17 9V4C17 2.6 18.1 1.5 19.5 1.5C20.9 1.5 22 2.6 22 4V9C22 10.4 20.9 11.5 19.5 11.5Z" fill="#2EB67D" />
        <path d="M20.5 23.5C20.5 22.1 21.6 21 23 21H25.5C26.9 21 28 22.1 28 23.5C28 24.9 26.9 26 25.5 26H23C21.6 26 20.5 24.9 20.5 23.5ZM20.5 19.5C20.5 20.9 21.6 22 23 22H28C29.4 22 30.5 20.9 30.5 19.5C30.5 18.1 29.4 17 28 17H23C21.6 17 20.5 18.1 20.5 19.5Z" fill="#ECB22E" />
    </svg>
);

export const OutlookLogo = ({ size = DEFAULT_SIZE, ...props }: BrandLogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M2.5 9.5L17 18.5L29.5 9.5V8.5C29.5 6.3 27.7 4.5 25.5 4.5H6.5C4.3 4.5 2.5 6.3 2.5 8.5V9.5Z" fill="#0078D4" opacity="0.8" />
        <path d="M29.5 11.5V23.5C29.5 25.7 27.7 27.5 25.5 27.5H6.5C4.3 27.5 2.5 25.7 2.5 23.5V11.5L16 20.5L29.5 11.5Z" fill="#0078D4" />
        <path d="M17.5 18.5L29.5 10.5V23.5C29.5 25.7 27.7 27.5 25.5 27.5L17.5 21.5V18.5Z" fill="#106EBE" />
    </svg>
);

export const SalesforceLogo = ({ size = DEFAULT_SIZE, ...props }: BrandLogoProps) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M22.5 9.5C21.8 6.5 19.2 4.5 16 4.5C12.8 4.5 10.2 6.5 9.5 9.5C6.5 10.2 4.5 12.8 4.5 16C4.5 19.2 6.5 21.8 9.5 22.5C10.2 25.5 12.8 27.5 16 27.5C19.2 27.5 21.8 25.5 22.5 22.5C25.5 21.8 27.5 19.2 27.5 16C27.5 12.8 25.5 10.2 22.5 9.5ZM19.5 16.5L16 20L12.5 16.5H15V12H17V16.5H19.5Z" fill="#00A1E0" />
        <path d="M10 16C10 14.9 10.9 14 12 14H16L19 11L21 13H22C23.1 13 24 13.9 24 15V17C24 18.1 23.1 19 22 19H12C10.9 19 10 18.1 10 17V16Z" fill="#FFF" opacity="0.9" />
    </svg>
);
