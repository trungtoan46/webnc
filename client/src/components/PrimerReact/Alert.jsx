import {Label} from '@primer/react/experimental'

function MyComponent({error}) {
  return <Label variant="success">
    {error ? (
        <span className="text-red-500">{error}</span>
    ) : (
        <span>Success!</span>
    )}
  </Label>
}

export default MyComponent;
