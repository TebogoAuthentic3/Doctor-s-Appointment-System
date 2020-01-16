using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BackEnd.Models;

namespace BackEnd.Controllers
{
    public class AttendedPatientsController : ApiController
    {
        private AttendedPatientsEntities db = new AttendedPatientsEntities();

        // GET api/AttendedPatients
        public IQueryable<ATTENDEDPATIENT> GetATTENDEDPATIENTS()
        {
            return db.ATTENDEDPATIENTS;
        }

        // GET api/AttendedPatients/5
        [ResponseType(typeof(ATTENDEDPATIENT))]
        public IHttpActionResult GetATTENDEDPATIENT(int id)
        {
            ATTENDEDPATIENT attendedpatient = db.ATTENDEDPATIENTS.Find(id);
            if (attendedpatient == null)
            {
                return NotFound();
            }

            return Ok(attendedpatient);
        }

        // PUT api/AttendedPatients/5
        public IHttpActionResult PutATTENDEDPATIENT(int id, ATTENDEDPATIENT attendedpatient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != attendedpatient.ID)
            {
                return BadRequest();
            }

            db.Entry(attendedpatient).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ATTENDEDPATIENTExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/AttendedPatients
        [ResponseType(typeof(ATTENDEDPATIENT))]
        public IHttpActionResult PostATTENDEDPATIENT(ATTENDEDPATIENT attendedpatient)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ATTENDEDPATIENTS.Add(attendedpatient);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ATTENDEDPATIENTExists(attendedpatient.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = attendedpatient.ID }, attendedpatient);
        }

        // DELETE api/AttendedPatients/5
        [ResponseType(typeof(ATTENDEDPATIENT))]
        public IHttpActionResult DeleteATTENDEDPATIENT(int id)
        {
            ATTENDEDPATIENT attendedpatient = db.ATTENDEDPATIENTS.Find(id);
            if (attendedpatient == null)
            {
                return NotFound();
            }

            db.ATTENDEDPATIENTS.Remove(attendedpatient);
            db.SaveChanges();

            return Ok(attendedpatient);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ATTENDEDPATIENTExists(int id)
        {
            return db.ATTENDEDPATIENTS.Count(e => e.ID == id) > 0;
        }
    }
}