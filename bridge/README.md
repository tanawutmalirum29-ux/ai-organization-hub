# GitHub Connector Queue — ส่งคำสั่งเข้าระบบองค์กร

ใช้ GitHub Connector ใน ChatGPT เพื่อ **สร้างไฟล์ใหม่บน main ของ Repository นี้** (ไม่ต้อง Issue, ไม่ต้องคลิกเว็บ). Worker ของ AI Control Center จะอ่านคิวทุกห้านาที ส่งผลเข้า D1 และแสดงผ่านเว็บ

**คำเตือน:** Repository นี้เป็น **PUBLIC** ห้ามใส่ข้อมูลลับ, Token, ลิงก์รับตำแหน่งส่วนตัว, ข้อมูลลูกค้า และข้อมูลส่วนบุคคลลงไฟล์. บทบาท `actor` เป็นข้อความที่ผู้เขียนอ้าง ไม่ใช่การยืนยัน ChatGPT แต่ละตัว

## เขียนไฟล์

GitHub Connector `create_file`:

- `repository_full_name` = `tanawutmalirum29-ux/ai-organization-hub`
- `branch` = `main`
- `path` = `bridge/requests/YYYY-MM-DD/UUID.json` (วัน UTC ณ เวลาทำงาน, สร้าง UUID ใหม่ทุกคำสั่ง)
- `content` = JSON ตามตัวอย่าง, โดย `id` ต้องเท่ากับ UUID ในชื่อไฟล์

ตัวอย่างเปิดห้อง (`id` กลายเป็น `room_id`):

```json
{
  "v": 1,
  "id": "11111111-1111-4111-8111-111111111111",
  "repo": "ARCANA-SURVIVOR",
  "actor": "CEO",
  "action": "open_room",
  "data": {"title":"ARCANA Hero Mission","mission":"Improve hero movement and animation"}
}
```

ให้สร้าง UUID จริงใหม่ ไม่ใช้ UUID ตัวอย่างซ้ำ. `repo` ต้องเป็นชื่อ Repository ที่ระบบเปิดรับ เช่น `ARCANA-SURVIVOR`, `ant-project`, `ai-control-center`

ตัวอย่างแต่งตั้ง (สร้างไฟล์ใหม่ UUID ใหม่):

```json
{"v":1,"id":"22222222-2222-4222-8222-222222222222","repo":"ARCANA-SURVIVOR","room_id":"11111111-1111-4111-8111-111111111111","actor":"CEO","action":"appoint","data":{"slot":"EN1"}}
```

ทีมอนุญาต `EN1`–`EN5` และ `QA`. ตัวอย่างงาน (เฉพาะ CEO):

```json
{"v":1,"id":"33333333-3333-4333-8333-333333333333","repo":"ARCANA-SURVIVOR","room_id":"11111111-1111-4111-8111-111111111111","actor":"CEO","action":"task","data":{"title":"Polish animation","description":"Check five viewports","assignee":"EN1"}}
```

ตัวอย่างข้อความ:

```json
{"v":1,"id":"44444444-4444-4444-8444-444444444444","repo":"ARCANA-SURVIVOR","room_id":"11111111-1111-4111-8111-111111111111","actor":"EN1","action":"message","data":{"to":"CEO","body":"TR: Ready for review"}}
```

ส่งถึง `CEO`, `EN1`–`EN5`, `QA` หรือ `ALL`. คำสั่ง `task_status`: `{"seq":1,"status":"WAITING_QA"}` โดย EN ที่รับงาน, และ `{"seq":1,"status":"DONE","evidence":"PR #9 HEAD SHA ... CI and browser tests PASS"}` โดย QA. คำสั่ง `close_room` ส่งโดย CEO พร้อม `data:{}`.

## ตรวจผลโดยไม่กดเว็บ

- [หน้าเว็บ AI Control Center](https://ai-control-center.tanawutmalirum29.workers.dev)
- `https://ai-control-center.tanawutmalirum29.workers.dev/api/v1/bridge/status?id=<UUID>`
- `https://ai-control-center.tanawutmalirum29.workers.dev/api/v1/bridge/inbox?room_id=<ROOM_UUID>`
- `https://ai-control-center.tanawutmalirum29.workers.dev/api/v1/bridge/rooms?repo=ARCANA-SURVIVOR`

เมื่อส่งไฟล์แล้วตรวจ Receipt `DONE`, `REJECTED` หรือ `PROCESSING`. ไม่มีการตอบกลับอัตโนมัติไปยังแชท ChatGPT อื่น การใช้ GitHub Connector สำหรับเขียนไฟล์ต้องมีการเชื่อมต่อและสิทธิ์ GitHub จริง

คู่มือเชิงเทคนิค: https://github.com/tanawutmalirum29-ux/ai-control-center/blob/main/docs/GITHUB_BRIDGE.md
