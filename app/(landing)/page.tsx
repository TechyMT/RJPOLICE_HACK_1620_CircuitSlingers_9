import { Input_Box } from "@/components/input";
import { Cards } from "@/components/cards";

const Landing = () => {
  return (
    <div>
      <div>
        <div className="max-w-3xl mx-auto mt-20 text-center text-4xl font-bold">
          <h1>Securing the Digital Community</h1>
        </div>
        <div className="max-w-3xl mx-auto mt-8 text-center text-4xl font-bold">
          <h1>Dial 1930</h1>
          <div className="flex flex-col items-center mt-8">
            <div className="w-96 h-16 mb-8">
              <Input_Box type="prompt" label="Ask me anything" />
            </div>
            <div className="mt-8">
              <Cards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
