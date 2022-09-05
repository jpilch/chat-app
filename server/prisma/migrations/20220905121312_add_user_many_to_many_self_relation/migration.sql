-- CreateTable
CREATE TABLE "UserContacts" (
    "userId" INTEGER NOT NULL,
    "contactId" INTEGER NOT NULL,

    CONSTRAINT "UserContacts_pkey" PRIMARY KEY ("userId","contactId")
);

-- AddForeignKey
ALTER TABLE "UserContacts" ADD CONSTRAINT "UserContacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContacts" ADD CONSTRAINT "UserContacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
