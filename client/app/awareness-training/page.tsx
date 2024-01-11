import React from "react";
import Heading from "../components/Heading";
const VideoDescriptionUI = () => {
  const videos = [
    {
      url: "https://firebasestorage.googleapis.com/v0/b/rjpolicehackathon.appspot.com/o/Video%20Gallery%2FCARD%20FRAUD%20hindi.mp4?alt=media&token=ab691738-a569-4f54-ad63-4a1f35a3c788",
      heading: "Credit Card Fraud",
      description:
        "Credit card fraud involves unauthorized use of someone's credit or debit card information for financial gain. Stay vigilant by regularly monitoring your statements, promptly reporting any suspicious transactions to your bank, and protecting your card details from phishing attempts. Utilize secure online payment methods and employ strong passwords to reduce the risk of falling victim to this digital crime.",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/rjpolicehackathon.appspot.com/o/Video%20Gallery%2FCatfishing%20Frauds.mp4?alt=media&token=e05f8bd6-98bf-43ee-bff5-b895a591c70b",
      heading: "Catfishing fraud",
      description:
        "Catfishing fraud occurs when someone creates a deceptive online persona to lure individuals into fake relationships, often for financial gain or to extract personal information. Stay cautious online, verify the identity of individuals you interact with, and be wary of sharing sensitive information with strangers. Protect yourself by using privacy settings on social media and reporting any suspicious activities to the platform. Building genuine connections online requires a healthy skepticism and a commitment to personal cybersecurity.",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/rjpolicehackathon.appspot.com/o/Video%20Gallery%2FCoffee%20and%20Password.mp4?alt=media&token=b604015b-3163-4891-8db8-093407ac5273",
      heading: "Coffee and Password",
      description:
        "Beware of the Coffee and Password threat, where cybercriminals exploit public Wi-Fi networks in cafes to intercept sensitive information, including passwords. Before connecting to any public Wi-Fi, ensure it is secure, use a Virtual Private Network (VPN) for added protection, and avoid accessing sensitive accounts or typing passwords when connected to unsecured networks. Your cybersecurity is as important as your morning coffee – savor it responsibly!",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/rjpolicehackathon.appspot.com/o/Video%20Gallery%2FCyber%20bullying.mp4?alt=media&token=6164036b-711a-4d80-9bb1-230576640c52",
      heading: "Cyber Bullying",
      description:
        "Cyberbullying is a harmful online behavior where individuals use digital platforms to harass, intimidate, or harm others emotionally. Foster a safe online environment by practicing empathy, reporting instances of cyberbullying, and supporting victims. Remember, the power of the internet can be used positively; let's strive for a digital world that promotes kindness, respect, and understanding. Stand up against cyberbullying, and let's make the online space a place where everyone feels valued and protected.",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/rjpolicehackathon.appspot.com/o/Video%20Gallery%2FCyber%20stalking.mp4?alt=media&token=59416d1d-e2ac-4524-b96c-be177f444a11",
      heading: "Cyber Stalking",
      description:
        "Cyberstalking is the menacing act of persistently tracking, harassing, or threatening someone online, causing emotional distress. Safeguard your digital space by adjusting privacy settings, being cautious about sharing personal information, and reporting any suspicious online behavior. Stand up against cyberstalking, and remember: online spaces should be platforms for positive interaction, not avenues for intimidation. Stay vigilant, stay safe, and let's create a virtual world free from fear and harassment.",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/rjpolicehackathon.appspot.com/o/Video%20Gallery%2FDigital%20Footprints.mp4?alt=media&token=d99afa1b-dfb9-4dd1-8983-fe2e18905879",
      heading: "Digital Footprints",
      description:
        "Digital footprints are the traces and records of online activities that individuals leave behind, including social media posts, online searches, and interactions. Be mindful of your digital footprint by managing privacy settings, thinking before sharing personal information, and regularly auditing your online presence. Just as we leave footprints in the sand, our digital trails shape our online reputation. Cultivate a positive digital presence and consider the long-term impact of your online actions. Your digital footprint is a reflection of you – make it a thoughtful and responsible one.",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/rjpolicehackathon.appspot.com/o/Video%20Gallery%2FFake%20emails.mp4?alt=media&token=7ed6db63-11ae-4339-8398-b512815ee1d4",
      heading: "Fake Emails",
      description:
        "Beware of fake emails, often known as phishing emails, where cybercriminals impersonate legitimate entities to deceive recipients into revealing sensitive information or clicking malicious links. Stay vigilant by verifying email sender addresses, avoiding unexpected attachments or links, and questioning requests for personal information. Your inbox is your digital fortress – protect it by staying skeptical and reporting suspicious emails to prevent falling prey to phishing scams. Keep your personal information safe and remember, when in doubt, verify before you click!",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/rjpolicehackathon.appspot.com/o/Video%20Gallery%2FOnline%20Job%20Fraud.mp4?alt=media&token=27c4dc9a-e91a-4460-8380-ce322d948592",
      heading: "Online Job Fraud",
      description:
        "Beware of online job fraud, where scammers pose as legitimate employers to deceive individuals seeking employment. Exercise caution when sharing personal information, avoid upfront payments, and research potential employers thoroughly. Protect yourself from falling victim to these scams by verifying job offers and reporting suspicious activities to relevant authorities. Your career journey should be safe and secure – stay vigilant in the digital job market.",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/rjpolicehackathon.appspot.com/o/Video%20Gallery%2FOnline%20Earning%20App%20Scam.mp4?alt=media&token=378b3777-e96d-46c5-8eea-f7970fe72d5c",
      heading: "Online Earning Scam",
      description:
        "Be cautious of online earning scams that promise quick and easy money with minimal effort. These scams often involve fraudulent schemes, fake investment opportunities, or pyramid schemes. Prioritize skepticism, thoroughly research any online earning opportunity, and avoid sharing financial information or making upfront payments. Protect your financial well-being by staying informed and reporting suspicious activities to relevant authorities. Genuine online opportunities exist, but it's crucial to distinguish them from potential scams to safeguard your financial security.",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/rjpolicehackathon.appspot.com/o/Video%20Gallery%2FLoan%20Scam.mp4?alt=media&token=3acc51c5-caf4-4ebc-b52e-2410e6ffae17",
      heading: "Loan Scam",
      description:
        "Watch out for loan scams where fraudsters offer tempting loans with unrealistic terms, aiming to exploit individuals in financial need. Be wary of unsolicited loan offers, high upfront fees, or requests for sensitive personal information. Verify the legitimacy of lenders, check reviews, and deal only with reputable financial institutions. Remember, a genuine loan won't ask for payment upfront, and cautious research can protect you from falling victim to fraudulent lending schemes. Always prioritize your financial safety and seek advice from trusted sources when considering loan options.",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/rjpolicehackathon.appspot.com/o/Video%20Gallery%2FWhat%20is%20Phishing%20Hindi.mp4?alt=media&token=47e4ac6e-21ed-482d-90d2-f919d8724d60",
      heading: "Phishing",
      description:
        "Phishing is a deceitful online tactic where attackers masquerade as trustworthy entities to trick individuals into divulging sensitive information, such as passwords or financial details. Stay alert for suspicious emails, messages, or websites, verify sender identities, and refrain from clicking on unexpected links. By cultivating a habit of skepticism and employing caution online, you can shield yourself from falling victim to these digital scams. Your online safety is paramount – be vigilant and report phishing attempts to protect your personal information.",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/rjpolicehackathon.appspot.com/o/Video%20Gallery%2FWork%20from%20home.mp4?alt=media&token=eed2ab7e-db5d-403c-a672-765fd3862b8b",
      heading: "Work from home",
      description:
        "While the flexibility of working from home offers convenience, it's essential to be vigilant against potential pitfalls. Verify the legitimacy of remote job opportunities, be cautious of unsolicited offers, and never share sensitive information without proper authentication. Prioritize secure communication channels and stay informed about common work-from-home scams to ensure a safe and productive remote work experience. Your diligence is key to navigating the digital workspace securely.",
    },
  ];

  return (
    <>
      <Heading children="Awareness and Training" />
      <div className="flex flex-wrap p-8">
        {videos.map((video, index) => (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            {/* Video Section */}
            <video
              className="w-full h-auto"
              controls
              src={video.url}
              type="video/mp4"
            />

            {/* Description Section */}
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">{video.heading}</h2>
              <p className="text-gray-700">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoDescriptionUI;
