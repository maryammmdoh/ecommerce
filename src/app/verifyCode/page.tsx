// app/verifyCode/page.tsx
'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';



export default function VerifyCodePage() {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');


    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        if (!code) {
            setMessage({ type: 'error', text: 'Please enter the code sent to your email' });
            setLoading(false);
            return;
        }
        try {
            // const { data } = await axios.post(
            //     'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
            //     { resetCode: code }
            // );
            setMessage({ type: 'success', text: 'Code verified successfully!' });
            router.push(`/resetPassword?email=${encodeURIComponent(email ?? '')}`);
        } catch (err: unknown) {
            const error = err as Error & { response?: { data?: { message?: string } } }; 
            setMessage({
                type: 'error',
                text:
                    error?.response?.data?.message ||
                    'Invalid code or something went wrong.',
            });
            toast.error('Invalid code or something went wrong.', { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-[50%] mt-20 mx-auto p-6 bg-purple-50 rounded-lg shadow-lg">
            <h3 className="mb-6 text-xl font-semibold text-center">Verify Reset Code</h3>
            {message && (
                <div
                    className={`mb-4 font-medium ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}
                >
                    {message.text}
                </div>
            )}
            <form onSubmit={handleVerify}>
                <div className='mb-6'>
                    <label style={{ display: 'block', marginBottom: 4 }}>Email</label>
                    <Input value={email ?? ''} disabled />
                </div>
                <div className="mb-4">
                    <Input
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        placeholder="Enter code"
                        maxLength={6}
                    />
                </div>
                <div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? 'Verifying...' : 'Verify Code'}
                    </Button>
                </div>
            </form>
        </div>
    );
}