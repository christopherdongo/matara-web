import { DotLoader
} from 'react-spinners';

export function Loading() {
    return(
        <div className="flex justify-center items-center h-screen">
        <DotLoader
 color="#36d7b7" loading={true} size={150} />
      </div>
    )
}