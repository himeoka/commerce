'use client';

import { updateCartNote } from 'components/cart/actions';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export function CartNote({ attributes }: { attributes: { key: string; value: string }[] }) {
  //のしの設定
  const noshiTypeValue = attributes.find(({ key }) => key == 'のしの種類');
  const [noshiType, setNoshiType] = useState(noshiTypeValue ? noshiTypeValue.value : '');
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNoshiType(e.target.value);
  };
  const options: string[] = [
    '指定なし',
    '御祝',
    '御年賀',
    '御中元',
    '御歳暮',
    '御礼',
    'お供え',
    '粗品',
    '内祝（結婚内祝、快気内祝）',
    '内祝（出産、その他）'
  ];

  //のしの名前
  const noshiTextValue = attributes.find(({ key }) => key == '送り主様氏名');
  const [noshiText, setNoshiText] = useState(noshiTextValue ? noshiTextValue.value : '');
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoshiText(e.target.value);
  };
  const { pending } = useFormStatus();
  const [message, formAction] = useFormState(updateCartNote, null);
  const actionWithAttributes = formAction.bind(null, [
    { key: 'のしの種類', value: noshiType },
    { key: '送り主様氏名', value: noshiText }
  ]);

  return (
    <form action={actionWithAttributes}>
      <div>
        のしの種類:
        <select className="ml-5" value={noshiType} onChange={handleTypeChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-5">
        送り主様氏名:
        <input className="ml-5" value={noshiText} onChange={handleTextChange} />
      </div>
      <button
        type="submit"
        onClick={(e: React.FormEvent<HTMLButtonElement>) => {
          if (pending) e.preventDefault();
        }}
        aria-label="Update cart Attributes"
        aria-disabled={pending}
        className="mt-10 block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
      >
        {pending ? <>設定中</> : <>設定する</>}
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
