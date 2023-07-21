import IconAlertTriangle from "../icons/IconAlert";
import IconArrowRight from "../icons/IconArrowRight";
import IconSunTwentyFour from "../icons/IconSun24";
import IconThunderbolt from "../icons/IconThunder";

export const ChatPlaceholder = () => {
  return (
    <div className="m-5">
      <h3 className="text-4xl font-bold text-center text-white my-8">
        Chat GPT
      </h3>

      <div className="flex flex-col md:flex-row gap-5 m-auto mb-8 md:max-w-4xl">
        <div>
          <div className="flex justify-center items-center text-lg mb-3 text-white">
            <IconSunTwentyFour width={24} height={24} className="mr-3" />
            Exemples
          </div>
          <div className="flex items-center justify-center bg-white/5 rounded text-center text-sm text-white mb-3 p-3 hover:bg-gray-900 cursor-pointer">
            'Explain quantum computing in simple terms'
            <IconArrowRight width={16} height={16} />
          </div>
          <div className="flex items-center justify-center bg-white/5 rounded text-center text-sm text-white mb-3 p-3 hover:bg-gray-900 cursor-pointer">
            'Got any creative ideas for a 10 year old`s birthday?'
            <IconArrowRight width={16} height={16} />
          </div>
          <div className="flex items-center justify-center bg-white/5 rounded text-center text-sm text-white mb-3 p-3 hover:bg-gray-900 cursor-pointer">
            'How do I make an HTTP request in javascript?'
            <IconArrowRight width={16} height={16} />
          </div>
        </div>

        <div>
          <div className="flex justify-center items-center text-lg mb-3 text-white">
            <IconThunderbolt width={24} height={24} className="mr-3 " />
            Capabilities
          </div>
          <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">
            Remember what user said earlier in the conversation
          </div>
          <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">
            Allows user to provide follow-up corrections
          </div>
          <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">
            Trained to decline inappropriate requests
          </div>
        </div>

        <div>
          <div className="flex justify-center items-center text-lg mb-3 text-white">
            <IconAlertTriangle width={24} height={24} className="mr-3" />
            Limitations
          </div>
          <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">
            May occasionally generate incorrect information
          </div>
          <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">
            May occasionally produce harmful instructions or biased content
          </div>
          <div className="bg-white/5 rounded text-center text-sm text-white mb-3 p-3">
            Limited knowledge of world and events after 2021
          </div>
        </div>
      </div>
    </div>
  );
};
