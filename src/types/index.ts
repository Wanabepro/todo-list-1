import task from "./task"
import tasklist from "./tasklist"
import { filters } from "./filters"

type setState<T> = React.Dispatch<React.SetStateAction<T>>

export type { task, tasklist, filters, setState }
