import React, { useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faExclamationTriangle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function CurrentState({ state }: { state: boolean[] }) {
  const [stability, setStability] = useState<number[]>([]);
  const [perturbation, setPerturbation] = useState<number[]>([]);
  const [isStable, setIsStable] = useState<boolean | null>(null);
  const [isCritical, setIsCritical] = useState<boolean | null>(null);


  useEffect(() => {
    const stabilityArray: number[] = [];
    const perturbationArray: number[] = [];

    state.forEach((s, index) => {
      if (s) {
        perturbationArray.push(index);
      } else {
        stabilityArray.push(index);
      }
    });

    setStability(stabilityArray);
    setPerturbation(perturbationArray);

    if (stability.length >= 2.5 * perturbation.length) {
      setIsStable(true);
      setIsCritical(false);
    } else if (stability.length < 2.4 * perturbation.length && stability.length > perturbation.length) {
      setIsStable(false);
      setIsCritical(false);
    } else {
      setIsStable(false);
      setIsCritical(true);
    }
  }, [state]);

  return (
    <div className='flex flex-col'>
      <div className="flex justify-between items-align border-b border-cyan-700">
      <h1 className='text-white text-lg pb-4 '>CURRENT STATE</h1>
      <FontAwesomeIcon
        icon={isStable && !isCritical ? faCheckCircle : isStable && isCritical ? faExclamationTriangle :  faTimesCircle }
        
        className='scale-150 text-cyan-700 hover:text-white rounded-full  border-radius-50 '
      />
      </div>
      
      <div className='text-white p-4 text-left'>
        {isStable && !isCritical && (
          <div>
           
            <p className='text-sm text-slate-100'>
              <span className='font-bold text-cyan-700'>STABLE :</span> Situation is generally stable, and there is no immediate cause for concern. Nevertheless, upon
              closer examination, a few noteworthy issues have come to light that warrant our attention and prompt
              resolution. Your diligence and collaboration in resolving these matters are greatly appreciated as we work
              together to maintain the highest standards of performance and reliability.
            </p>
          </div>
        )}
        {!isStable && !isCritical && (
          <div>
          
            <p className='text-sm text-slate'>
            <span className='font-bold text-cyan-700'>UNSTABLE : </span> Although the current stability is maintained. The stability, while a positive factor, is
              overshadowed by the severity of the identified problems.you have to address these critical issues head-on.
              Your immediate attention and rapid response are indispensable to mitigate risks and ensure the robustness
              of our systems. Thank you for your urgent commitment to resolving these critical challenges.
            </p>
          </div>
        )}

        {!isStable && isCritical && (
         
          <p className='text-sm text-zinc-400'>
            <span className='font-bold text-cyan-700'>CRITICAL :</span> The current status indicates a critical condition and instability. Immediate attention is
            required to address the identified issues and restore stability. It is crucial to act swiftly and implement
            necessary measures to prevent further complications. Thank you for your urgent attention to this matter.
          </p>
      
        )}
      </div>
      <div className="mr-4">
        {window.location.pathname !=='/dashboard/services/warning' && (
    <Link href={'/services/warning'}  className='text-cyan-700 hover:text-white mr-4'> View <FontAwesomeIcon icon={faArrowRight} /></Link>
        )}
    </div>
    </div>
  );
}
