
import React, { useState, useEffect } from 'react';
import { Bot, Music, Shield, Gamepad2, Sparkles, Command, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const CommandSection = ({ title, commands, currentPage, totalPages, onPageChange }: { 
  title: string; 
  commands: Array<{name: string, description: string, usage: string}>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const COMMANDS_PER_PAGE = 6;
  const startIndex = (currentPage - 1) * COMMANDS_PER_PAGE;
  const endIndex = startIndex + COMMANDS_PER_PAGE;
  const currentCommands = commands.slice(startIndex, endIndex);

  return (
    <div className="mb-12 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-neutral-800">{title}</h3>
        {totalPages > 1 && (
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-neutral-200 disabled:opacity-50 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-neutral-600">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-neutral-200 disabled:opacity-50 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {currentCommands.map((cmd) => (
          <div key={cmd.name} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <h4 className="text-lg font-semibold text-neutral-900 mb-2 animate-fade-in-down">{cmd.name}</h4>
            <p className="text-neutral-600 mb-3 animate-fade-in-up">{cmd.description}</p>
            <SyntaxHighlighter language="bash" style={atomDark} className="rounded-md">
              {cmd.usage}
            </SyntaxHighlighter>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('aura');
  const [currentPage, setCurrentPage] = useState(1);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const sections = {
    aura: {
      title: "Aura Management",
      icon: Command,
      commands: [
        { name: "top", description: "View the aura points leaderboard", usage: "!!top" },
        { name: "aura", description: "Check aura points for a user", usage: "!!aura [@user]" },
        { name: "daily", description: "Request daily aura points", usage: "!!daily" },
        { name: "trade", description: "Trade aura points with another user", usage: "!!trade <@user> <card>" }
      ]
    },
    daily: {
      title: "Daily Activities",
      icon: Command,
      commands : [
        { name: "daily", description: "Claim your daily reward", usage: "!!daily" },
        { name: "weekly", description: "Claim weekly reward", usage: "!!weekly" }
      ]
    },
    music: {
      title: "Music Commands",
      icon: Music,
      commands: [
        { name: "join/leave", description: "Connect/Disconnect voice channel", usage: "!!join\n!!leave" },
        { name: "play", description: "Play a song from YouTube or Spotify", usage: "!!play <song name or URL>" },
        { name: "pause/resume", description: "Pause or resume playback", usage: "!!pause\n!!resume" },
        { name: "next", description: "Skip current track", usage: "!!next" },
        { name: "repeat/autoplay", description: "Toggle repeat/autoplay modes", usage: "!!repeat\n!!autoplay" },
        { name: "volume", description: "Set volume", usage: "!!volume <0-2>" },
        { name: "queue", description: "Display the current playlist", usage: "!!queue" },
        { name: "settings", description: "Change music settings", usage: "!!settings" },
        { name: "nightcore", description: "Toggle nightcore effect", usage: "!!nightcore" },
        { name: "8D", description: "Toggle 8D audio effect", usage: "!!8D" },
        { name: "vaporwave", description: "Toggle vaporwave effect", usage: "!!vaporwave" },
        { name: "cleareffect", description: "Clear all audio effects", usage: "!!cleareffect" }
      ]
    },
    user: {
      title: "User  Interaction",
      icon: Command,
      commands: [
        { name: "userinfo", description: "Display user info", usage: "!!userinfo [@user]" },
        { name: "profile", description: "View your profile", usage: "!!profile [@user]" },
        { name: "setnick", description: "Change a member's nickname", usage: "!!setnick <@user> <nickname>" },
        { name: "feedback", description: "Submit feedback", usage: "!!feedback <message>" },
        { name: "avatar", description: "View user's avatar", usage: "!!avatar [@user]" },
        { name: "afk", description: "Set AFK status", usage: "!!afk [reason]" }
      ]
    },
    server: {
      title: "Server Interaction",
      icon: Shield,
      commands: [
        { name: "membercount", description: "Show server member count", usage: "!!membercount" },
        { name: "auditlog", description: "View recent audit logs", usage: "!!auditlog <amount>" },
        { name: "clonechannel", description: "Clone a channel", usage: "!!clonechannel [#channel]" },
        { name: "purge", description: "Purge messages", usage: "!!purge <amount>" },
        { name: "snipe", description: "Retrieve last deleted message", usage: "!!snipe" },
        { name: "timer", description: "Set a countdown timer", usage: "!!timer <seconds>" },
        { name: "instainfo", description: "Get Instagram info", usage: "!!instainfo <URL>" },
        { name: "post", description: "Fetch Instagram posts", usage: "!!post <user> [limit]" },
        { name: "instavideo", description: "Get Instagram video info", usage: "!!instavideo <URL>" },
        { name: "cleanlinks", description: "Clean messages with links", usage: "!!cleanlinks [amount]" },
        { name: "cleanfiles", description: "Clean messages with files", usage: "!!cleanfiles [amount]" },
        { name: "cleanimages", description: "Clean messages with images", usage: "!!cleanimages [amount]" }
      ]
    },
    fun: {
      title: "Fun Commands",
      icon: Sparkles,
      commands: [
        { name: "trivia", description: "Start a trivia game", usage: "!!trivia" },
        { name: "rps", description: "Play Rock, Paper, Scissors", usage: "!!rps" },
        { name: "dice", description: "Roll a dice", usage: "!!dice" },
        { name: "coinflip", description: "Flip a coin", usage: "!!coinflip" },
        { name: "flirt", description: "Flirt with someone", usage: "!!flirt < @user>" },
        { name: "roast", description: "Roast someone", usage: "!!roast <@user>" },
        { name: "love", description: "Love compatibility test", usage: "!!love <@user>" },
        { name: "monopoly", description: "Start a monopoly game", usage: "!!monopoly" },
        { name: "cuddle", description: "Cuddle someone", usage: "!!cuddle <@user>" },
        { name: "hug", description: "Hug someone", usage: "!!hug <@user>" },
        { name: "kiss", description: "Kiss someone", usage: "!!kiss <@user>" },
        { name: "pat", description: "Pat someone", usage: "!!pat <@user>" },
        { name: "slap", description: "Slap someone", usage: "!!slap <@user>" },
        { name: "punch", description: "Punch someone", usage: "!!punch <@user>" },
        { name: "bite", description: "Bite someone", usage: "!!bite <@user>" },
        { name: "highfive", description: "High-five someone", usage: "!!highfive <@user>" },
        { name: "wave", description: "Wave at someone", usage: "!!wave <@user>" },
        { name: "boop", description: "Boop someone", usage: "!!boop <@user>" },
        { name: "snuggle", description: "Snuggle with someone", usage: "!!snuggle <@user>" },
        { name: "bully", description: "Bully someone (playfully)", usage: "!!bully <@user>" },
        { name: "think", description: "Show you're thinking", usage: "!!think" },
        { name: "akinator", description: "Play Akinator", usage: "!!akinator" },
        { name: "wordle", description: "Play Wordle", usage: "!!wordle" }
      ]
    },
    shop: {
      title: "Shop System",
      icon: Command,
      commands: [
        { name: "shop", description: "View available items in the shop", usage: "!!shop" },
        { name: "buy", description: "Purchase an item from the shop", usage: "!!buy <item>" }
      ]
    },
    management: {
      title: "Server Management",
      icon: Shield,
      commands: [
        { name: "kick/ban", description: "Remove members", usage: "!!kick/ban <@user> [reason]" },
        { name: "settempvc", description: "Configure temp VCs", usage: "!!settempvc <channel_id> <category_id>" },
        { name: "interface", description: "Open the temporary VC interface", usage: "!!interface" },
        { name: "stickyvc", description: "Create or mark a sticky VC", usage: "!!stickyvc [name]" },
        { name: "dev-announce", description: "Send a dev announcement", usage: "!!dev-announce <message>" },
        { name: "setprefix", description: "Change the bot's prefix", usage: "!!setprefix <new_prefix>" },
        { name: "setup", description: "Create a custom role command", usage: "!!setup" },
        { name: "setlogchannel", description: "Set logging channel", usage: "!!setlogchannel <#channel>" },
        { name: "setmentionlimit", description: "Set mention spam limit", usage: "!!setmentionlimit <on/off> [limit]" },
        { name: "blocklinks", description: "Toggle link blocking", usage: "!!blocklinks <on/off>" },
        { name: "setwelcome", description: "Set welcome message", usage: "!!setwelcome <message>" }
      ]
    },
    games: {
      title: "Aura Games",
      icon: Gamepad2,
      commands: [
        { name: "dropcard", description: "Get a random card", usage: "!!dropcard" },
        { name: "mycards", description: "View your card collection", usage: "!!mycards" },
        { name: "sellcard", description: "Sell a card for aura points", usage: "!!sellcard <card>" }
      ]
    },
    utility: {
      title: "Utility Commands",
      icon: Command,
      commands: [
        { name: "search", description: "Search anything", usage: "!!search [question]" },
        { name: "imagine", description: "Generate an image using AI", usage: "!!imagine [ prompt]" },
        { name: "describe", description: "Analyze an image using AI", usage: "!!describe [image]" },
        { name: "math", description: "Solve math questions", usage: "!!math [question]" },
        { name: "anime", description: "Get anime recommendations", usage: "!!anime" },
        { name: "manga", description: "Get manga recommendations", usage: "!!manga" },
        { name: "movie", description: "Fetch movie information", usage: "!!movie [name]" },
        { name: "weather", description: "Get weather information", usage: "!!weather <location>" },
        { name: "translate", description: "Translate text", usage: "!!translate <lang> <text>" },
        { name: "tts", description: "Text to speech", usage: "!!tts <text>" },
        { name: "finance", description: "Get financial information", usage: "!!finance <query>" },
        { name: "unitconvert", description: "Convert units", usage: "!!unitconvert <value> <from> to <to>" },
        { name: "programming", description: "Programming related queries", usage: "!!programming <query>" },
        { name: "health", description: "Health related information", usage: "!!health <query>" }
      ]
    },
    moderation: {
      title: "Moderation",
      icon: Shield,
      commands: [
        { name: "chatban", description: "Mute user from chat", usage: "!!chatban @member [reason]" },
        { name: "vcban", description: "Ban from voice channels", usage: "!!vcban @member [reason]" },
        { name: "vcmute", description: "Mute in voice channels", usage: "!!vcmute @member" },
        { name: "vcdeafen", description: "Deafen in voice channels", usage: "!!vcdeafen @member" },
        { name: "vcdrag", description: "Move everyone to a new channel", usage: "!!vcdrag" },
        { name: "lock", description: "Lock a channel", usage: "!!lock [#channel]" },
        { name: "unlock", description: "Unlock a channel", usage: "!!unlock [#channel]" },
        { name: "lockall", description: "Lock all channels", usage: "!!lockall [reason]" },
        { name: "unlockall", description: "Unlock all channels", usage: "!!unlockall [reason]" },
        { name: "warn", description: "Warn a user", usage: "!!warn <@user> [reason]" },
        { name: "mute", description: "Mute a user", usage: "!!mute <@user> [duration] [reason]" },
        { name: "unmute", description: "Unmute a user", usage: "!!unmute <@user>" }
      ]
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setCurrentPage(1);
  };

  const calculateTotalPages = (commands: Array<any>) => {
    return Math.ceil(commands.length / 6);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#394738] relative overflow-hidden">
        {/* Custom cursor */}
        <div className="absolute w-4 h-4 bg-white rounded-full pointer-events-none transition-all duration-100"
             style={{ left: cursorX, top: cursorY }} />

        {/* Main content */}
        <div className="relative z-10">
          {/* Hero Section */}
          <div className="container mx-auto px-4 py-16">
            <nav className="flex justify-between items-center mb-16">
              <div className="flex items-center space-x-2">
                <Bot className="w-8 h-8 text-white" />
                <span className="text-2xl font-bold text-white">Jojo Bot</span>
              </div>
              <Link to="/invite" className="bg-[#2c2f2f] hover:bg-[#2f3130] text-white font-bold py-2 px-6 rounded-full transition-all duration-300">
                Add to Discord
              </Link>
            </nav>

            <div className="text-center">
              <h1 className="text-6xl font-extrabold text-white mb-6">
                Jojo Discord Bot
              </h1>
              <p className="text-xl text-[#a0a0a0] mb-12 max-w-2xl mx-auto">
                A powerful, feature-rich Discord bot with music, moderation, games, and more.
              </p>
            </ ```typescript
            </div>
          </div>

          {/* Documentation Section */}
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="md:w-64 space-y-2">
                {Object.entries(sections).map(([key, section]) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => handleSectionChange(key)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeSection === key 
                          ? 'bg-[#2c2f2f] text-white' 
                          : 'hover:bg-[#2f3130] text-[#a0a0a0]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{section.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-8">
                  {sections[activeSection as keyof typeof sections].title}
                </h2>
                <CommandSection 
                  title="Available Commands"
                  commands={sections[activeSection as keyof typeof sections].commands}
                  currentPage={currentPage}
                  totalPages={calculateTotalPages(sections[activeSection as keyof typeof sections].commands)}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>

          {/* Meet the Founder Section */}
          <section className="container mx-auto px-4 py-16">
            <div className="bg-[#2c2f2f] rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-8">Meet the Founder</h2>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img src="/adam.jpg" alt="Adam" className="w-32 h-32 rounded-full border-4 border-white" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Adam</h3>
                  <p className="text-[#a0a0a0] leading-relaxed">
                    I started this project just for fun, but it turned out to be something much deeper and more meaningful.
                    Everyone should try creating something like this - it's an incredible learning experience.
                    I'm still learning and growing with this project, and I hope you enjoy using Jojo Bot as much as I enjoy creating it.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="container mx-auto px-4 py-8 text-center">
            <div className="flex flex-col md:flex-row justify-center space-x-8">
              <Link to="/privacy" className="text-[#a0a0a0] hover:text-white transition-colors duration-300">Privacy Policy</Link>
              <Link to="/terms" className="text-[#a0a0a0] hover:text-white transition-colors duration-300">Terms of Service</Link>
              <Link to="/about" className="text-[#a0a0a0] hover:text-white transition-colors duration-300">About Us</Link>
            </div>
            <p className="mt-4 text-[#a0a0a0]">© 2024 Jojo Bot. Made with ❤️ by Adam</p>
          </footer>
        </div>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/about" element={
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-white mb-8">About Us</h2>
            <div className="bg-[#2c2f2f] p-8 rounded-2xl">
              <p className="text-[#a0a0a0] leading-relaxed">
                Jojo Bot is a feature-rich Discord bot created to provide entertainment, moderation, and utility features
                for Discord servers. Started as a fun project, it has grown into a powerful tool used by thousands
                of users. The bot is constantly being improved and updated with new features.
              </p>
            </div>
          </section>
        } />
        <Route path="/privacy" element={
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-white mb-8">Privacy Policy</h2>
            <div className="bg-[#2c ```typescript
2f2f] p-8 rounded-2xl">
              <p className="text-[#a0a0a0] leading-relaxed">
                We take privacy seriously. This Privacy Policy outlines how we collect, use, and protect your data.
              </p>
            </div>
          </section>
        } />
        <Route path="/terms" element={
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-white mb-8">Terms of Service</h2>
            <div className="bg-[#2c2f2f] p-8 rounded-2xl">
              <p className="text-[#a0a0a0] leading-relaxed">
                By using Jojo Bot, you agree to our Terms of Service which outline the rules and guidelines for using
                the bot in your Discord server.
              </p>
            </div>
          </section>
        } />
      </Routes>
    </Router>
  );
}

export default App;
```
