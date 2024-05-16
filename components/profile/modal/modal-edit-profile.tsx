import ModalContainer from '@/components/ui/modal-container'
import { baseURL } from '@/constants/base64'
import ic_upload_cover from '@/icons/profile/edit-profile/ic-cover.svg'
import ic_pen from '@/icons/profile/edit-profile/pen.svg'
import ic_upload from '@/icons/profile/edit-profile/upload.svg'
import loading from '@/images/inscribe/loading.svg'
import user from '@/images/profile/edit-profile/user.png'
import decor from '@/images/profile/profile-info/decor.png'
import { profileService } from '@/services/profile.service'
import { FileType, ProfileType } from '@/types/profile'
import { QueryClient, QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

interface Props {
  open: boolean
  handleClose: () => void
  publickey: string
  wallet_address: string
  queryClient: QueryClient
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<ProfileType, Error>>
  profile: ProfileType | undefined
}

const ModalEditProfile = ({
  open,
  handleClose,
  publickey,
  wallet_address,
  queryClient,
  profile,
  refetch,
}: Props) => {
  const [file, setFile] = useState({
    avatar: '',
    cover: '',
  })
  const [form, setForm] = useState({
    userName: '',
    bio: '',
  })

  const [isPending, setIsPending] = useState({
    avatar: false,
    cover: false,
  })

  const uploadImage = async (file: FormData) => {
    const { data }: AxiosResponse<FileType> = await profileService.uploadImage(file)
    return data
  }

  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (!e.target.files) return
    setIsPending({ ...isPending, [key]: true })
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    const avatarFile = await uploadImage(formData)
    if (avatarFile.file_url) {
      setFile({ ...file, [key]: avatarFile.file_url })
      setIsPending({ ...isPending, [key]: false })
    }
  }

  const handleSubmit = async () => {
    const payload = {
      avatar: file.avatar || profile?.avatar,
      bio: form.bio || profile?.bio,
      cover: file.cover || profile?.cover,
      name: form.userName || profile?.name,
      public_key: publickey,
      wallet_address: wallet_address,
    }

    const res = await profileService.editProfile(payload)

    if (res.status === 200) {
      toast.success('Edit profile successfully')
      handleClose()
      refetch()
    }
  }

  return (
    <ModalContainer open={open} handleClose={handleClose}>
      <div className='mx-auto my-10 h-[921px] w-full bg-[#fff] px-6 py-4 lg:w-[511px]'>
        <figure className='mx-auto w-[183px]'>
          <Image src={decor} alt='decor icon' />
        </figure>
        <div className='relative mt-4 flex flex-col gap-6'>
          <p className='text-left text-xs font-light text-[#4E473F]'>
            {(profile?.avatar || file.avatar) ? '' : 'avatar'}
          </p>
          <figure className='mx-auto mt-2 flex h-[160px] w-[160px] flex-col items-center justify-center'>
            {isPending.avatar ? (
              <Image src={loading} width={40} height={40} className='mx-auto' alt='' />
            ) : (
              <>
                {!file?.avatar && !profile?.avatar ? (
                  <Image src={user} alt='user' className='h-full w-full' />
                ) : (
                  <Image
                    src={file.avatar || String(profile?.avatar)}
                    alt=''
                    loader={() => file.avatar || String(profile?.avatar)}
                    width={0}
                    height={0}
                    sizes='100vw'
                    placeholder='blur'
                    blurDataURL={baseURL}
                    className='h-full w-full rounded-full'
                  />
                )}
              </>
            )}

            {!profile?.avatar && !file.avatar ? (
              <div className='mt-2 flex w-full items-center justify-center gap-2'>
                <Image src={ic_upload} alt='icon upload' className='h-4 w-4 min-w-4' />
                <label
                  htmlFor='upload-file'
                  className='cursor-pointer text-xs font-light uppercase text-[#AE9955] underline'
                >
                  upload file
                </label>
                <input
                  onChange={(e) => {
                    handleChangeAvatar(e, 'avatar')
                  }}
                  type='file'
                  className='hidden'
                  id='upload-file'
                />
              </div>
            ) : (
              <>
                <label
                  htmlFor='upload-file'
                  className='absolute right-0 top-0 flex cursor-pointer items-center gap-2'
                >
                  <Image src={ic_pen} alt='icon pen' width={24} height={24} className='min-w-6' />
                  <span className='text-sm font-light uppercase text-[#AE9955]'>Edit</span>
                  <input
                    onChange={(e) => {
                      handleChangeAvatar(e, 'avatar')
                    }}
                    type='file'
                    className='hidden'
                    id='upload-file'
                  />
                </label>
              </>
            )}
          </figure>
        </div>
        <div className='relative mx-auto mt-4 flex w-full flex-col gap-2'>
          <p className='text-left text-xs font-light text-[#4E473F]'>
            {(profile?.cover || file.cover) ? (
              <>
                <label
                  htmlFor='upload-cover'
                  className='flex cursor-pointer items-center justify-end gap-2'
                >
                  <Image src={ic_pen} alt='icon pen' width={24} height={24} className='min-w-6' />
                  <span className='text-sm font-light uppercase text-[#AE9955]'>Edit</span>
                  <input
                    onChange={(e) => {
                      handleChangeAvatar(e, 'cover')
                    }}
                    type='file'
                    className='hidden'
                    id='upload-cover'
                  />
                </label>
              </>
            ) : (
              'Cover'
            )}
          </p>
          <div className='mt-2 flex h-[158px] w-full min-w-full items-center justify-center rounded-lg bg-[#FAF7F5]'>
            {isPending.cover ? (
              <Image src={loading} width={20} height={20} className='mx-auto' alt='' />
            ) : (
              <>
                {file?.cover || profile?.cover ? (
                  <Image
                    src={file.cover || String(profile?.cover)}
                    alt=''
                    loader={() => file.cover || String(profile?.cover)}
                    width={0}
                    height={0}
                    sizes='100vw'
                    objectFit='cover'
                    placeholder='blur'
                    blurDataURL={baseURL}
                    objectPosition='center'
                    className='h-full w-full rounded-lg'
                  />
                ) : (
                  <div className='flex h-full w-full flex-col justify-center gap-4 lg:w-[431px]'>
                    <label htmlFor='upload-cover'>
                      <Image
                        src={ic_upload_cover}
                        alt='icon'
                        className='mx-auto h-[44px] w-[44px] min-w-[44px] cursor-pointer'
                      />
                    </label>
                    <input
                      type='file'
                      id='upload-cover'
                      className='hidden'
                      onChange={(e) => {
                        handleChangeAvatar(e, 'cover')
                      }}
                    />
                    <p className='tex-center flex flex-col text-xs font-light leading-[18px] text-[#AE9955]'>
                      <span>Click to Upload or Drag and Drop</span>
                      <span className='whitespace-nowrap'>
                        Suggested image size: 3300 x 5100px. Max image size: 20MB
                      </span>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className='mt-4'>
          <p className='text-left text-xs font-light uppercase text-[#4E473F]'>name</p>
          <input
            className='mt-2 h-[44px] w-full truncate rounded border border-[#E5E4E3] px-4 py-3 text-sm font-light text-text-black outline-none'
            defaultValue={profile?.name}
            // value={profile?.name}
            // placeholder='0'
            onChange={(e) => setForm({ ...form, userName: e.target.value })}
          />
        </div>
        <div className='relative mt-4'>
          <p className='text-left text-xs font-light uppercase text-[#4E473F]'>bio</p>
          <textarea
            maxLength={100}
            rows={50}
            className='mt-2 h-[194px] w-full resize-none rounded border border-[#E5E4E3] px-4 py-3 text-sm font-light text-text-black outline-none'
            // value={form.bio}
            defaultValue={profile?.bio}
            // placeholder='0'
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
          <p className='absolute bottom-4 right-4 h-fit w-fit text-[#B2B0AD]'>
            <span
              className={`${Number(form.bio?.length) === 0 ? 'text-[#B2B0AD]' : 'text-[#FF6634]'}`}
            >
              {form.bio?.length || profile?.bio.length || 0}
            </span>
            /100
          </p>
        </div>
        <button
          onClick={() => {
            handleSubmit()
          }}
          // disabled={disable}
          className={`
          mt-8 h-[60px] w-[280px] bg-[url(/images/profile/edit-profile/btn-save.png)] bg-full transition-all`}
          // onClick={Number(price) >= 0.00001 ? handleSubmit : undefined}
        />
      </div>
    </ModalContainer>
  )
}

export default ModalEditProfile
