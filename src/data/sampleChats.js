// Realistic college chat sample datasets for CatchUp AI

export const SAMPLE_CHATS = [
  {
    id: "capstone",
    title: "CS Capstone: ByteForce 404",
    tagline: "Final submission sprint, AWS bill panic & professor demo",
    category: "Academic / Capstone",
    icon: "GraduationCap",
    messagesCount: 38,
    rawText: `[09:15 AM, 10/09/2026] Sarah (Lead): Morning team! Reminder that our final capstone portal on Moodle locks at 11:59 PM TONIGHT. No extensions granted as per Dean's notice.
[09:17 AM, 10/09/2026] Dev: Wait what?! I thought it was tomorrow midnight?!
[09:18 AM, 10/09/2026] Sarah (Lead): No Dev, Prof. Rao sent an email yesterday at 8 PM. Tonight is the hard deadline!
[09:20 AM, 10/09/2026] Dev: Oh damn. Okay, backend is mostly done but I just ran into a huge merge conflict on main branch.
[09:22 AM, 10/09/2026] Maya (Frontend): Dev, did you overwrite my auth flow changes in PR #42? The login redirect is throwing a 500 error now!
[09:24 AM, 10/09/2026] Dev: Looking at it now. It was the JWT token expiry middleware conflict. Reverting commit 8f9b2 now.
[09:26 AM, 10/09/2026] Leo (DevOps): GUYS URGENT: Just got an AWS CloudWatch billing alert. Our EC2 instance and RDS PostgreSQL racked up $142 because someone left a p3.2xlarge GPU running!
[09:27 AM, 10/09/2026] Dev: My bad, was running the model embedding benchmark last night. Terminating the GPU instance immediately.
[09:30 AM, 10/09/2026] Leo (DevOps): Thanks. Scaled down to t3.medium. We are within free tier credits again.
[09:32 AM, 10/09/2026] Sarah (Lead): DECISION: We are freezing all code by 6:00 PM today. No new features after 6 PM, only bug fixes and documentation. Everyone agree?
[09:33 AM, 10/09/2026] Maya (Frontend): Agreed. We need at least 3 hours for end-to-end testing and the report.
[09:34 AM, 10/09/2026] Dev: +1 agreed. Code freeze at 6 PM.
[09:35 AM, 10/09/2026] Leo (DevOps): Agreed.
[09:41 AM, 10/09/2026] Sarah (Lead): Also, Prof. Rao just messaged me: Mandatory in-person project walkthrough and live demo today at 4:15 PM in Turing Lab 302.
[09:43 AM, 10/09/2026] Maya (Frontend): Lab 302? Do we need to bring our own HDMI dongle?
[09:44 AM, 10/09/2026] Leo (DevOps): I have a USB-C to HDMI adapter in my backpack, I'll bring it.
[09:48 AM, 10/09/2026] Sarah (Lead): Tasks breakdown for today:
- Dev: Fix the JWT 500 auth bug and verify API swagger docs by 1:00 PM.
- Maya: Finish the responsive mobile views and export high-res UI screenshots for the presentation by 2:30 PM.
- Leo: Compile the 25-page project report PDF and generate the Plagiarism report (Turnitin) by 3:30 PM.
- Sarah: Prepare the 12-slide pitch deck and finalize demo script before 3:45 PM.
[09:52 AM, 10/09/2026] Maya (Frontend): On it. Working on the dashboard charts and screenshots now.
[09:55 AM, 10/09/2026] Dev: Auth fix is committed and tested locally. Pushing to staging branch in 5 mins.
[10:12 AM, 10/09/2026] Leo (DevOps): Quick question: which citation style are we using for the bibliography in the IEEE report?
[10:14 AM, 10/09/2026] Sarah (Lead): DECISION: Use standard IEEE citation format with BibTeX. Do not use APA.
[10:16 AM, 10/09/2026] Leo (DevOps): Got it, updating Overleaf.
[10:45 AM, 10/09/2026] Maya (Frontend): Should we include dark mode in the live demo?
[10:47 AM, 10/09/2026] Dev: Haha Rao loves dark mode, remember his compiler course slides?
[10:48 AM, 10/09/2026] Sarah (Lead): Yes, default to dark mode for the lab projector!
[11:05 AM, 10/09/2026] Dev: Staging build passed! CI/CD pipeline green.
[11:20 AM, 10/09/2026] Sarah (Lead): Great! Let's meet in the campus cafeteria at 3:15 PM for a 30-min dry run before we head to Lab 302. See everyone there!`,
    presetAnalysis: {
      summary: "The capstone team is in an emergency sprint before the Moodle portal closes at 11:59 PM tonight. They resolved a breaking JWT auth merge conflict and shut down an expensive AWS GPU instance that burned $142. They instituted an official code freeze at 6:00 PM, scheduled a mandatory lab demo with Prof. Rao at 4:15 PM in Lab 302, and planned a 3:15 PM dry-run meetup in the cafeteria.",
      keyTakeaways: [
        "Final capstone portal closes tonight at 11:59 PM sharp on Moodle (hard deadline, zero extensions).",
        "Mandatory in-person demo scheduled with Prof. Rao at 4:15 PM in Turing Lab 302.",
        "Code freeze agreed for 6:00 PM today; staging build is currently green.",
        "AWS billing scare resolved by shutting down p3.2xlarge GPU instance and reverting to t3.medium.",
        "Pre-demo team rehearsal scheduled at 3:15 PM in campus cafeteria."
      ],
      urgencyLevel: "critical",
      urgentMessages: [
        {
          sender: "Sarah (Lead)",
          time: "09:15 AM",
          content: "Final capstone portal on Moodle locks at 11:59 PM TONIGHT. No extensions granted as per Dean's notice.",
          reason: "Hard submission deadline tonight with zero extensions allowed."
        },
        {
          sender: "Leo (DevOps)",
          time: "09:26 AM",
          content: "AWS CloudWatch billing alert: EC2 + RDS racked up $142 because someone left a p3.2xlarge GPU running!",
          reason: "Active cloud infrastructure cost overrun requiring immediate termination."
        },
        {
          sender: "Sarah (Lead)",
          time: "09:41 AM",
          content: "Mandatory in-person project walkthrough and live demo today at 4:15 PM in Turing Lab 302.",
          reason: "Compulsory faculty assessment event happening this afternoon."
        }
      ],
      tasks: [
        {
          id: "task-1",
          task: "Fix JWT 500 auth bug & verify API swagger docs",
          assignee: "Dev",
          deadline: "Today, 1:00 PM",
          priority: "high",
          completed: true
        },
        {
          id: "task-2",
          task: "Finish responsive mobile views & export high-res UI screenshots",
          assignee: "Maya",
          deadline: "Today, 2:30 PM",
          priority: "high",
          completed: false
        },
        {
          id: "task-3",
          task: "Bring USB-C to HDMI adapter for lab projector",
          assignee: "Leo",
          deadline: "Today, 4:00 PM",
          priority: "medium",
          completed: false
        },
        {
          id: "task-4",
          task: "Compile 25-page project report PDF & run Turnitin plagiarism check",
          assignee: "Leo",
          deadline: "Today, 3:30 PM",
          priority: "critical",
          completed: false
        },
        {
          id: "task-5",
          task: "Finalize 12-slide pitch deck and rehearse demo walkthrough",
          assignee: "Sarah",
          deadline: "Today, 3:45 PM",
          priority: "high",
          completed: false
        },
        {
          id: "task-6",
          task: "Submit final zip archive & report to Moodle portal",
          assignee: "Sarah (Lead)",
          deadline: "Tonight, 11:59 PM",
          priority: "critical",
          completed: false
        }
      ],
      deadlines: [
        {
          event: "Dev's API Swagger & Auth Fix",
          time: "Today at 1:00 PM",
          location: "GitHub Repo",
          isUrgent: false
        },
        {
          event: "Pre-Demo Team Dry Run",
          time: "Today at 3:15 PM",
          location: "Campus Cafeteria",
          isUrgent: true
        },
        {
          event: "Mandatory Walkthrough Demo with Prof. Rao",
          time: "Today at 4:15 PM",
          location: "Turing Lab 302",
          isUrgent: true
        },
        {
          event: "Strict Code Freeze",
          time: "Today at 6:00 PM",
          location: "Main Git Branch",
          isUrgent: true
        },
        {
          event: "Final Moodle Submission Lockout",
          time: "Tonight at 11:59 PM",
          location: "Moodle Portal",
          isUrgent: true
        }
      ],
      decisions: [
        "Strict code freeze at 6:00 PM today; no new feature commits, only fixes and report polish.",
        "Scale AWS architecture down from p3.2xlarge GPU instance to free-tier t3.medium.",
        "Use IEEE citation standard with BibTeX on Overleaf (rejected APA).",
        "Enable Dark Mode as the default view during the physical demo projector presentation."
      ],
      participants: [
        { name: "Sarah (Lead)", messages: 8, role: "Team Lead & Coordinator" },
        { name: "Dev", messages: 9, role: "Backend Developer" },
        { name: "Leo (DevOps)", messages: 7, role: "DevOps & Report Lead" },
        { name: "Maya (Frontend)", messages: 6, role: "Frontend UI/UX" }
      ],
      stats: {
        totalMessages: 38,
        noiseFilteredPercent: 78,
        timeSavedMinutes: 14,
        sentiment: "High Tension / Focused Productive"
      }
    }
  },
  {
    id: "hackathon",
    title: "Hackathon Squad: Team Neon",
    tagline: "36-hour hack, mentor critique, API switch & Devpost deadline",
    category: "Hackathon / Competition",
    icon: "Flame",
    messagesCount: 42,
    rawText: `[02:10 AM, 10/09/2026] Ananya (PM): Hey team, 14 hours down in the hackathon. How are we doing on the AI copilot pipeline?
[02:12 AM, 10/09/2026] Rohan (ML): Hit a wall with OpenAI 429 rate limit on our free trial API key. It's throttling every 3rd request.
[02:14 AM, 10/09/2026] Kabir (Fullstack): That's bad for live judging. If the judge tests it and gets a 429, we're disqualified.
[02:16 AM, 10/09/2026] Rohan (ML): DECISION: Let's pivot to Gemini 2.0 Flash or Claude 3.5 Sonnet. Gemini has higher free RPM tier and sub-second latency.
[02:18 AM, 10/09/2026] Kabir (Fullstack): Agree! I can rewrite the streaming wrapper in 20 minutes.
[02:22 AM, 10/09/2026] Priya (UI/UX): Just uploaded the polished Dark Mode dashboard Figma prototypes to the shared drive. Check out the glowing neon theme!
[02:25 AM, 10/09/2026] Ananya (PM): Priya that looks INSANE! The judges are going to love the glassmorphism aesthetic.
[02:30 AM, 10/09/2026] Ananya (PM): IMPORTANT ANNOUNCEMENT from Hackathon Discord:
1. Devpost submission portal closes sharp at 8:30 AM tomorrow.
2. Mentor Review Session #2 slot is booked for our team at 5:00 AM in Booth 14.
3. 2-minute demo video MUST be uploaded to YouTube as unlisted before 7:45 AM.
[02:35 AM, 10/09/2026] Kabir (Fullstack): Who is recording the demo video?
[02:36 AM, 10/09/2026] Ananya (PM): I will record Loom voiceover and stitch the video once Kabir gets the UI talking to the Gemini backend.
[02:40 AM, 10/09/2026] Priya (UI/UX): I'll design the Devpost header graphic, logo icon, and pitch slide deck right now.
[02:45 AM, 10/09/2026] Rohan (ML): Gemini endpoint is integrated and responding in 410ms! No more 429 errors.
[03:00 AM, 10/09/2026] Kabir (Fullstack): Free Red Bulls and midnight pizza arrived at Hall B! Someone grab some before the crypto teams finish it.
[03:02 AM, 10/09/2026] Rohan (ML): I'm on it, bringing 4 slices and 4 cans to our table.
[03:20 AM, 10/09/2026] Ananya (PM): DECISION: We will pitch under the 'Best AI Developer Tool' track instead of 'General Track' because the prize pool is higher and lower competition.
[03:22 AM, 10/09/2026] Priya (UI/UX): Great call! Updating Devpost track tags now.
[04:40 AM, 10/09/2026] Kabir (Fullstack): Frontend and backend deployed on Vercel: neon-catchup.vercel.app!
[04:45 AM, 10/09/2026] Ananya (PM): Incredible work team. 15 minutes until Mentor check-in at Booth 14. Bring the laptop with live URL!`,
    presetAnalysis: {
      summary: "Team Neon pivoted from OpenAI to Google Gemini 2.0 Flash to eliminate 429 rate limit errors during judging. They deployed their full-stack app on Vercel, targeted the 'Best AI Developer Tool' category for higher winning odds, and scheduled video recording ahead of the 8:30 AM Devpost submission deadline.",
      keyTakeaways: [
        "Swapped backend AI provider to Gemini 2.0 Flash to avoid 429 rate limits during live judging.",
        "Devpost submission deadline is 8:30 AM tomorrow; 2-minute unlisted demo video due by 7:45 AM.",
        "Team selected 'Best AI Developer Tool' track for strategic prize advantage.",
        "Live staging app successfully deployed and verified on Vercel.",
        "Mandatory Mentor review session scheduled for 5:00 AM at Booth 14."
      ],
      urgencyLevel: "critical",
      urgentMessages: [
        {
          sender: "Ananya (PM)",
          time: "02:30 AM",
          content: "Devpost submission portal closes sharp at 8:30 AM tomorrow. 2-min demo video must be uploaded before 7:45 AM.",
          reason: "Strict competition deadline; missing video voids submission."
        },
        {
          sender: "Rohan (ML)",
          time: "02:12 AM",
          content: "Hit a wall with OpenAI 429 rate limit on free tier API key. Throttling every 3rd request.",
          reason: "Critical technical failure that would cause live judging demo to crash."
        },
        {
          sender: "Ananya (PM)",
          time: "04:45 AM",
          content: "15 minutes until Mentor check-in at Booth 14. Bring laptop with live URL!",
          reason: "Imminent scheduled mentor assessment."
        }
      ],
      tasks: [
        {
          id: "task-h1",
          task: "Rewrite AI streaming client to use Gemini 2.0 Flash",
          assignee: "Kabir",
          deadline: "Today, 3:00 AM",
          priority: "critical",
          completed: true
        },
        {
          id: "task-h2",
          task: "Design Devpost header graphic, logo, and pitch deck slides",
          assignee: "Priya",
          deadline: "Today, 4:30 AM",
          priority: "high",
          completed: true
        },
        {
          id: "task-h3",
          task: "Record 2-minute Loom walkthrough demo video and upload to YouTube",
          assignee: "Ananya",
          deadline: "Today, 7:45 AM",
          priority: "critical",
          completed: false
        },
        {
          id: "task-h4",
          task: "Submit final Devpost project form with GitHub repo and live Vercel URL",
          assignee: "Ananya",
          deadline: "Tomorrow, 8:30 AM",
          priority: "critical",
          completed: false
        }
      ],
      deadlines: [
        {
          event: "Mentor Review Session #2",
          time: "Today at 5:00 AM",
          location: "Booth 14, Main Hall",
          isUrgent: true
        },
        {
          event: "2-Minute Demo Video YouTube Upload",
          time: "Today at 7:45 AM",
          location: "YouTube (Unlisted)",
          isUrgent: true
        },
        {
          event: "Devpost Final Project Freeze & Submit",
          time: "Tomorrow at 8:30 AM",
          location: "Devpost Portal",
          isUrgent: true
        }
      ],
      decisions: [
        "Swapped AI model provider to Gemini 2.0 Flash for sub-500ms latency and zero 429 rate limits.",
        "Targeting 'Best AI Developer Tool' track instead of general category.",
        "Selected Vercel for live hosting over local tunneling for judge stability."
      ],
      participants: [
        { name: "Ananya (PM)", messages: 7, role: "Project Manager & Presenter" },
        { name: "Kabir (Fullstack)", messages: 6, role: "Fullstack Architect" },
        { name: "Rohan (ML)", messages: 5, role: "AI & Model Engineer" },
        { name: "Priya (UI/UX)", messages: 4, role: "Product Designer" }
      ],
      stats: {
        totalMessages: 42,
        noiseFilteredPercent: 82,
        timeSavedMinutes: 18,
        sentiment: "Adrenaline / Energetic Execution"
      }
    }
  },
  {
    id: "technova",
    title: "Tech Fest: Technova 2026 Core Comm",
    tagline: "Guest speaker delay, blown sound amplifier & sponsor banner crisis",
    category: "Campus Events / Leadership",
    icon: "Megaphone",
    messagesCount: 35,
    rawText: `[11:00 AM, 10/09/2026] Rahul (Convenor): Attention Core Leads: Quick status check. Gates open in 3 hours at 2:00 PM.
[11:04 AM, 10/09/2026] Sneha (Finance/Sponsor): URGENT: Intel, our title sponsor, just arrived on campus. Their representative noticed that our main entrance backdrop has last year's sponsor logo!
[11:06 AM, 10/09/2026] Rahul (Convenor): WHAT? Who sent the old flex print file to the printer?!
[11:08 AM, 10/09/2026] Arjun (Logistics): The printing vendor printed the old PDF from Drive. I just called them. They can rush a new 20x10ft vinyl flex banner by 1:30 PM if we pay $50 express fee.
[11:10 AM, 10/09/2026] Sneha (Finance/Sponsor): DECISION: Pay the $50 express fee immediately. Intel gave us $4,000 in prize sponsorship, we cannot compromise this.
[11:12 AM, 10/09/2026] Arjun (Logistics): Done, vendor started printing. Will be here by 1:30 PM.
[11:18 AM, 10/09/2026] Vikram (Stage/Sound): Bad news from the main auditorium. Left speaker channel on the Yamaha mixer started crackling and blew out during mic check.
[11:21 AM, 10/09/2026] Rahul (Convenor): Can we use the backup Behringer mixer from Lab 2?
[11:23 AM, 10/09/2026] Vikram (Stage/Sound): Yes, but it's locked in the HOD's store room. Need someone with faculty access key before 1:00 PM.
[11:25 AM, 10/09/2026] Rahul (Convenor): I am with Prof. Sharma now, getting the physical store room key. Vikram, meet me at Admin block at 12:45 PM.
[11:35 AM, 10/09/2026] Tanvi (PR & Socials): Keynote Speaker update: Dr. Kulkarni's flight from Bengaluru had a 45-minute tarmac delay. His cab will reach campus at 3:15 PM instead of 2:30 PM.
[11:38 AM, 10/09/2026] Rahul (Convenor): DECISION: Shift Keynote talk to 3:45 PM. Move the Student Robotic Showcase forward to 2:15 PM to fill the opening slot. Tanvi, announce schedule shift on Instagram and WhatsApp channels.
[11:42 AM, 10/09/2026] Tanvi (PR & Socials): Posting the updated schedule story right now. Also, 450 students have already checked in at the outer gate!
[11:50 AM, 10/09/2026] Rahul (Convenor): Emergency briefing for all 30 student volunteers at 1:15 PM sharp at Audi-1 stage. Don't be late!`,
    presetAnalysis: {
      summary: "High-stakes campus fest coordination: Title sponsor Intel demanded immediate correction of the entrance banner, resolved via a $50 rush print arriving at 1:30 PM. The blown auditorium mixer was replaced with a backup from the faculty store, and Keynote Speaker flight delay prompted a program swap with the Robotics Showcase at 2:15 PM.",
      keyTakeaways: [
        "Replaced incorrect entrance flex banner with $50 express reprint arriving by 1:30 PM.",
        "Auditorium sound mixer issue resolved by fetching backup unit from faculty store room.",
        "Keynote speaker delayed; Robot Showcase swapped to 2:15 PM, Keynote moved to 3:45 PM.",
        "Mandatory all-volunteer briefing at 1:15 PM in Main Auditorium.",
        "Over 450 attendees already queued at registration."
      ],
      urgencyLevel: "high",
      urgentMessages: [
        {
          sender: "Sneha (Finance/Sponsor)",
          time: "11:04 AM",
          content: "Intel title sponsor arrived on campus and noticed the main entrance backdrop has last year's sponsor logo!",
          reason: "Major title sponsor dissatisfaction risking $4k funding."
        },
        {
          sender: "Vikram (Stage/Sound)",
          time: "11:18 AM",
          content: "Left speaker channel on Yamaha mixer blew out during mic check in main auditorium.",
          reason: "Main stage audio failure 3 hours before doors open."
        },
        {
          sender: "Tanvi (PR & Socials)",
          time: "11:35 AM",
          content: "Keynote Speaker Dr. Kulkarni's flight delayed; arriving at 3:15 PM instead of 2:30 PM.",
          reason: "Headline keynote speaker timing disruption."
        }
      ],
      tasks: [
        {
          id: "task-t1",
          task: "Collect rush 20x10ft Intel banner from vendor and mount at entrance",
          assignee: "Arjun",
          deadline: "Today, 1:30 PM",
          priority: "critical",
          completed: false
        },
        {
          id: "task-t2",
          task: "Collect faculty storeroom key and swap blown mixer for Behringer unit",
          assignee: "Vikram & Rahul",
          deadline: "Today, 12:45 PM",
          priority: "critical",
          completed: true
        },
        {
          id: "task-t3",
          task: "Publish revised event itinerary (Robotics at 2:15 PM, Keynote at 3:45 PM) on Instagram",
          assignee: "Tanvi",
          deadline: "Today, 12:30 PM",
          priority: "high",
          completed: true
        },
        {
          id: "task-t4",
          task: "Conduct mandatory briefing for all 30 student volunteers at Audi-1",
          assignee: "Rahul",
          deadline: "Today, 1:15 PM",
          priority: "high",
          completed: false
        }
      ],
      deadlines: [
        {
          event: "Mixer Handover at Admin Block",
          time: "Today at 12:45 PM",
          location: "Admin Block",
          isUrgent: true
        },
        {
          event: "All-Volunteers Emergency Briefing",
          time: "Today at 1:15 PM",
          location: "Audi-1 Stage",
          isUrgent: true
        },
        {
          event: "New Intel Banner Mount",
          time: "Today at 1:30 PM",
          location: "Main Entrance",
          isUrgent: true
        },
        {
          event: "Gates Open & Robotics Showcase",
          time: "Today at 2:15 PM",
          location: "Main Auditorium",
          isUrgent: false
        },
        {
          event: "Rescheduled Keynote (Dr. Kulkarni)",
          time: "Today at 3:45 PM",
          location: "Main Auditorium",
          isUrgent: false
        }
      ],
      decisions: [
        "Approved $50 express print fee to preserve $4,000 Intel title sponsorship relation.",
        "Swapped event order: Robotics Showcase moved earlier to 2:15 PM, Keynote shifted back to 3:45 PM.",
        "Utilized department backup Behringer mixer instead of renting third-party sound gear."
      ],
      participants: [
        { name: "Rahul (Convenor)", messages: 6, role: "Event Lead" },
        { name: "Sneha (Finance)", messages: 4, role: "Sponsorship Lead" },
        { name: "Arjun (Logistics)", messages: 4, role: "Logistics Manager" },
        { name: "Vikram (Sound)", messages: 4, role: "AV Lead" },
        { name: "Tanvi (PR)", messages: 4, role: "Social & Communications" }
      ],
      stats: {
        totalMessages: 35,
        noiseFilteredPercent: 74,
        timeSavedMinutes: 12,
        sentiment: "High Urgency / Decisive Operations"
      }
    }
  },
  {
    id: "flatmates",
    title: "Apartment 302: Hostel / Flatmate Chaos",
    tagline: "Landlord inspection notice, unpaid Wi-Fi bill & leaking pipe",
    category: "Student Living / Dorm",
    icon: "Home",
    messagesCount: 30,
    rawText: `[08:00 AM, 10/09/2026] Alex: Morning guys, please read this. Landlord Uncle just texted me: 'Surprise flat inspection tomorrow (Thursday) at 10:30 AM with the building association president.'
[08:02 AM, 10/09/2026] Jordan: WHAT?! Did he see the empty pizza boxes stacked up like the Leaning Tower of Pisa in the balcony?
[08:04 AM, 10/09/2026] Sameer: We need a massive deep clean tonight or we lose our $1,200 security deposit.
[08:06 AM, 10/09/2026] Chris: Also, why did the Wi-Fi cut off at 7 AM? I was in the middle of submitting my quiz!
[08:08 AM, 10/09/2026] Sameer: Shoot... I forgot to pay the ACT Fibernet bill. It was due yesterday. Bill is $44 total ($11 each).
[08:10 AM, 10/09/2026] Alex: Just sent you $11 on Google Pay. Sameer please pay the bill immediately so internet turns back on!
[08:12 AM, 10/09/2026] Chris: Sent $11 too.
[08:13 AM, 10/09/2026] Jordan: Sent my $11.
[08:15 AM, 10/09/2026] Sameer: Received all. Paid the bill online. ISP says router will re-authenticate in 15 mins.
[08:20 AM, 10/09/2026] Jordan: Important: The kitchen sink pipe underneath is dripping water onto the wooden cabinet. If the landlord sees water damage, we're done for.
[08:22 AM, 10/09/2026] Alex: DECISION: We split a plumber visit today. I know a local plumber who charges $15. Calling him now for a 2:00 PM visit.
[08:24 AM, 10/09/2026] Chris: Agreed.
[08:30 AM, 10/09/2026] Alex: Cleaning duties breakdown for tonight at 8:00 PM:
- Alex: Deep clean kitchen, stove, and throw away all accumulated trash bags.
- Jordan: Living room, mop the floor, hide extra mattresses.
- Chris: Balcony clear-out, recycle all cardboard boxes and bottles.
- Sameer: Bathrooms scrub and air freshener restock.
[08:35 AM, 10/09/2026] Sameer: Sounds fair. Also, don't forget the college Mess Rebate form has to be stamped at the Warden office before 4:00 PM today if you want your $60 mess refund.
[08:38 AM, 10/09/2026] Chris: Oh right! I'll take all 4 forms to the Warden office during lunch break at 1:30 PM. Leave them on the dining table!`,
    presetAnalysis: {
      summary: "Apartment 302 faces a sudden landlord and building association inspection tomorrow at 10:30 AM, risking their $1,200 deposit. They immediately paid their overdue $44 Wi-Fi bill to restore connection, booked an emergency plumber for a 2:00 PM kitchen sink repair, assigned cleaning duties for 8:00 PM, and coordinated submitting mess rebate forms before 4:00 PM.",
      keyTakeaways: [
        "Surprise flat inspection by Landlord and Building President tomorrow at 10:30 AM.",
        "Wi-Fi bill ($44 total / $11 each) paid and internet connection being restored.",
        "Kitchen sink plumbing leak scheduled for repair at 2:00 PM ($15 split).",
        "Mandatory all-flatmate cleaning blitz tonight at 8:00 PM.",
        "Chris submitting hostel mess rebate refund forms to Warden before 4:00 PM."
      ],
      urgencyLevel: "high",
      urgentMessages: [
        {
          sender: "Alex",
          time: "08:00 AM",
          content: "Landlord Uncle texted: Surprise flat inspection tomorrow (Thursday) at 10:30 AM with the building association president.",
          reason: "Risk of $1,200 security deposit deduction or penalty if apartment is untidy."
        },
        {
          sender: "Jordan",
          time: "08:20 AM",
          content: "Kitchen sink pipe underneath is dripping water onto wooden cabinet causing water damage.",
          reason: "Active plumbing leak risking property damage."
        },
        {
          sender: "Sameer",
          time: "08:35 AM",
          content: "College Mess Rebate form has to be stamped at Warden office before 4:00 PM today for $60 refund.",
          reason: "Financial reimbursement deadline closing at 4:00 PM today."
        }
      ],
      tasks: [
        {
          id: "task-f1",
          task: "Pay overdue ACT Fibernet Wi-Fi bill ($44)",
          assignee: "Sameer",
          deadline: "Immediate",
          priority: "critical",
          completed: true
        },
        {
          id: "task-f2",
          task: "Host plumber visit to replace leaking kitchen sink trap",
          assignee: "Alex",
          deadline: "Today, 2:00 PM",
          priority: "high",
          completed: false
        },
        {
          id: "task-f3",
          task: "Take 4 mess rebate forms to Warden office for stamp",
          assignee: "Chris",
          deadline: "Today, 1:30 PM",
          priority: "high",
          completed: false
        },
        {
          id: "task-f4",
          task: "Execute complete apartment deep clean before landlord arrives",
          assignee: "All Flatmates",
          deadline: "Tonight, 8:00 PM",
          priority: "critical",
          completed: false
        }
      ],
      deadlines: [
        {
          event: "Warden Office Mess Rebate Submission",
          time: "Today at 4:00 PM",
          location: "Hostel Admin Office",
          isUrgent: true
        },
        {
          event: "Plumber Arrival for Sink Repair",
          time: "Today at 2:00 PM",
          location: "Flat 302 Kitchen",
          isUrgent: false
        },
        {
          event: "Flat Cleaning Blitz",
          time: "Tonight at 8:00 PM",
          location: "Flat 302",
          isUrgent: true
        },
        {
          event: "Landlord & Association President Inspection",
          time: "Tomorrow at 10:30 AM",
          location: "Flat 302",
          isUrgent: true
        }
      ],
      decisions: [
        "Split $15 emergency plumber fee evenly across all 4 flatmates.",
        "Divided flat cleaning responsibilities: Alex (kitchen), Jordan (hall), Chris (balcony), Sameer (bathrooms).",
        "Chris designated to bundle and submit all mess rebate claims together."
      ],
      participants: [
        { name: "Alex", messages: 5, role: "Flatmate / Coordinator" },
        { name: "Jordan", messages: 4, role: "Flatmate" },
        { name: "Sameer", messages: 5, role: "Flatmate / Utilities" },
        { name: "Chris", messages: 4, role: "Flatmate" }
      ],
      stats: {
        totalMessages: 30,
        noiseFilteredPercent: 70,
        timeSavedMinutes: 10,
        sentiment: "Urgent Panic / Coordinated Relief"
      }
    }
  }
];
