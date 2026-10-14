# DIR → TL — Message template

Only a DIR may appoint its **own** TLs, two maximum, respecting global 10 AI. Replace [D] with the department letter and [N] with 1 or 2.

```text
APPOINTMENT | DIR-[D] → TL-[D][N] | ACCEPT_ROLE
Role ID / ชื่อแชทแนะนำ: TL-[D][N] | หัวหน้าตรง: DIR-[D] | ทีม: [TASK_SCOPE]
อ่าน https://github.com/tanawutmalirum29-ux/appointment-CEO/blob/main/roles/TL.md และ README; รับแต่งตั้งในแชท แบ่งงานให้ Engineer ทีมตัวเองไม่เกิน 2 คน ตรวจรับ PR ก่อนส่ง DIR-[D]; ห้ามแก้ appointment-CEO
```

For `DIR-A`, instantiate `TL-A1` or `TL-A2`, never `TL-B1`. Each appointed TL can later appoint its own Engineers only if globally free seats remain.

Recipient replies `รับแต่งตั้ง: TL-A1 | หัวหน้าตรง: DIR-A | งานทีม: ...` in CHAT ONLY. No Github Issue/ACK/registry.
