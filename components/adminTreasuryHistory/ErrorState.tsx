import { FileWarningIcon, RefreshCcwIcon } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '../ui/alert'

export function ErrorState({ error }: { error: Error }) {
  return (
    <Alert variant="destructive">
      <FileWarningIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message}
        <button 
          onClick={() => window.location.reload()} 
          className="ml-2 inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <RefreshCcwIcon className="h-4 w-4 mr-1" /> Retry
        </button>
      </AlertDescription>
    </Alert>
  )
}
