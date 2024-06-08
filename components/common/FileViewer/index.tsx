import { cn } from '@/lib/utils'

const FileViewer: React.FC<{ className: string; src: string }> = ({ className, src }) => {
  return (
    <div className={cn('file-viewer', className)}>
      <iframe title="PDF" src={`/pdf/web/viewer.html?file=${src}`} width="100%" height="100%"></iframe>
    </div>
  )
}

export default FileViewer

