import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/index';
import { departments, schools } from '@/db/schema';
import { requireAdmin } from '@/app/api/utils/auth';
import { eq, and } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { isNumericString } from '@/app/utils';


export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ schoolId: string; departmentId: string }> }
) {

  try {
    const authError = await requireAdmin(request)
    if(authError) return authError

    const { schoolId, departmentId } = await params;
    const schoolIdNum = isNumericString(schoolId) ? parseInt(schoolId) : null;
    const departmentIdNum = isNumericString(departmentId) ? parseInt(departmentId) : null;
    
    if(schoolIdNum === null || departmentIdNum === null){
        return NextResponse.json(
            {error: "Invalid school ID or invalid department ID"},
            {status: 400}
        )
    }

    const body = await request.json()

    const result = await db
        .update(departments)
        .set({
            name: body.name,
            school_id: body.schoolId
        })
        .where(
            and(
                eq(departments.id, departmentIdNum),
                eq(departments.school_id, schoolIdNum)

            )
        ).returning({
            updatedDepartmentId: departments.id,
            updatedDepartmentName: departments.name,
            updatedDepartmentSchoolId: departments.school_id
        });
 

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error updating the department in the given school:', error);
    return NextResponse.json(
      { error: 'Failed to update the department in the given school' },
      { status: 500 }
    );
  }
}



export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ schoolId: string; departmentId: string }> }
) {

  try {
    const authError = await requireAdmin(request)
    if(authError) return authError

    const { schoolId } = await params;
    const schoolIdNum = isNumericString(schoolId) ? parseInt(schoolId) : null;

    if(schoolIdNum === null){
        return NextResponse.json(
            {error: "Invalid school ID"},
            {status: 400}
        )
    }

    const schoolsArr = await db
        .select()
        .from(schools)
        .where(eq(schools.id, schoolIdNum))

    if(schoolsArr.length <= 0){
        return NextResponse.json(
            {error: 'School of the given school ID does not exist'},
            {status: 404}
        )
    }

    const body = await request.json()
    const result = await db
        .insert(departments)
        .values({
            name: body.name,
            school_id: body.schoolId
        })
        .returning({
            insertedDepartmentId: departments.id
        });
 

    return NextResponse.json({
        success: true,
        data: result
    });

  } catch (error) {
    console.error('Error inserting department to the given school:', error);
    return NextResponse.json(
        { error: 'Failed to isnert department to the given school' },
        { status: 500 }
    );
  }
}