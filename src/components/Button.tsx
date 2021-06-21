// type ButtonProps = {
//   //text?: string[]; // tipagem de array de string
//   //text?: string; // tipagem de string e o ? significa nao obrigatorio receber uma props
//   children?: string
// }

import { useState } from "react"

// export function Button(props: ButtonProps) {
export function Button() {
  const [counter, setCounter] = useState(0)

  function increment() {
    setCounter(counter + 1)
  }

  return (
    <div>
      {/* <button>{props.text || 'Button Default'}</button> */}
      <button onClick={increment}> {counter} </button> 
    </div>
  )
}