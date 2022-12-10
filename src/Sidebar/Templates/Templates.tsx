import Pattern from './Pattern';
import patterns from './patterns';
import './Templates.scss';

export default function Templates() {
  return (
    <>
      {patterns.map(pattern => (
        <Pattern name={pattern.name} pattern={pattern.pattern} />
      ))}
    </>
  );
}
