export default function AICommentCard({ children }) {
  return (
    <div className='bg-light rounded-[20px] px-5 py-4'>
      <div className='text-sm leading-6 font-medium text-black'>{children}</div>
    </div>
  )
}
