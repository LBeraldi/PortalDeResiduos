import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

type Common = { label: string; hint?: string; error?: string }
type FieldProps =
  | (Common & { as?: 'input' } & InputHTMLAttributes<HTMLInputElement>)
  | (Common & { as: 'textarea' } & TextareaHTMLAttributes<HTMLTextAreaElement>)

/**
 * Campo de formulário (CP-08): rótulo acima, borda com 3:1, 44 px de altura e
 * mensagem por campo ligada por `aria-describedby`. O erro substitui a dica.
 */
export function Field(props: FieldProps) {
  const id = useId()
  const messageId = `${id}-mensagem`
  const { label, hint, error } = props
  const message = error ?? hint
  const shared = {
    id,
    className: 'field-control',
    'aria-describedby': message ? messageId : undefined,
    'aria-invalid': error ? true : undefined,
  }
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {props.as === 'textarea' ? (
        <textarea {...omit(props)} {...shared} />
      ) : (
        <input {...omit(props)} {...shared} />
      )}
      {message && <p id={messageId} className={error ? 'field-error' : 'field-hint'}>{message}</p>}
    </div>
  )
}

function omit<T extends Common & { as?: string }>(props: T) {
  const { label: _label, hint: _hint, error: _error, as: _as, ...rest } = props
  return rest
}
