import { TwoFactorSetUpForm } from '#root/components/auth/2fa/two-factor-setup-form';
import { globalGETRateLimit } from '#root/server/lib/request';
import { getCurrentSession } from '#root/server/lib/session';
import { encodeBase64 } from '@oslojs/encoding';
import { createTOTPKeyURI } from '@oslojs/otp';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { renderSVG } from 'uqr';

export const getServerSideProps = (async c => {
    if (!globalGETRateLimit(c)) {
        return { redirect: { destination: '/429', permanent: false } };
    }

    const { session, user } = await getCurrentSession(c);

    if (session == null) {
        return { redirect: { destination: '/login', permanent: false } };
    }
    if (!user.emailVerified) {
        return {
            redirect: {
                destination: '/verify-email',
                permanent: false,
            },
        };
    }

    if (user.registered2fa && !session.twoFactorVerified) {
        return {
            redirect: { destination: '/2fa', permanent: false },
        };
    }

    const totpKey = new Uint8Array(20);
    crypto.getRandomValues(totpKey);
    const encodedTOTPKey = encodeBase64(totpKey);
    const keyURI = createTOTPKeyURI('Demo', user.username, totpKey, 30, 6);
    const qrcode = renderSVG(keyURI);

    return { props: { encodedTOTPKey, qrcode } };
}) satisfies GetServerSideProps<{ encodedTOTPKey: string; qrcode: string }>;

export default function TwoFactorSetupPage({
    encodedTOTPKey,
    qrcode,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            <h1>Set up two-factor authentication</h1>
            <div
                style={{
                    width: '200px',
                    height: '200px',
                }}
                dangerouslySetInnerHTML={{
                    __html: qrcode,
                }}
            ></div>
            <TwoFactorSetUpForm encodedTOTPKey={encodedTOTPKey} />
        </>
    );
}
